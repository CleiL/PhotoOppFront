'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Preview() {
  const [image, setImage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const imageId = localStorage.getItem('capturedImageId')

    if (!imageId) return

    fetch(`http://localhost:3001/photo/${imageId}`)
      .then(res => res.json())
      .then(data => {
        setImage(data.imageUrl)
      })
      .catch(err => {
        console.error('Erro ao carregar imagem do backend:', err)
      })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-300 flex flex-col items-center justify-between py-6 px-4">
      {/* Retângulo com borda arredondada */}
      <div className="bg-white rounded border border-gray-300 shadow w-full max-w-sm flex flex-col justify-between h-full flex-1">
        {/* Header dentro do retângulo */}
        <Header />

        {/* Imagem capturada */}
        <div className="flex-1 flex items-center justify-center my-4">
          {image ? (
            <Image
              src={image}
              alt="Imagem capturada"
              width={300}
              height={400}
              className="rounded border border-gray-400"
            />
          ) : (
            <p className="text-gray-500">Imagem não disponível.</p>
          )}
        </div>

        {/* Footer dentro do retângulo */}
        <Footer />
      </div>

      {/* Botões fora do retângulo */}
      <div className="flex gap-4 mt-6 w-full max-w-sm">
        <button
          onClick={() => router.push('/capture')}
          className="flex-1 border border-gray-800 bg-gray-300 text-gray-700 font-semibold py-2 rounded shadow"
        >
          Refazer
        </button>
        <button
          onClick={() => router.push('/download')}
          className="flex-1 bg-gray-800 text-white font-semibold py-2 rounded shadow"
        >
          Continuar
        </button>
      </div>
    </main>
  )
}
