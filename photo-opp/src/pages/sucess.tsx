'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Success() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const imageId = localStorage.getItem('capturedImageId')

    if (!imageId) {
      router.push('/capture')
    } else {
      fetch(`http://localhost:3001/photo/${imageId}`)
        .then(res => res.json())
        .then(data => setImageSrc(data.imageUrl))
        .catch(err => {
          console.error('Erro ao buscar imagem:', err)
          router.push('/capture')
        })
    }
  }, [router])

  const handleContinue = () => {
    router.push('/final')
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Foto capturada com sucesso!</h1>

      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Foto capturada"
          className="max-w-full max-h-[60vh] mb-6 rounded shadow"
          width={300}
          height={400}
        />
      )}

      <button
        onClick={handleContinue}
        className="bg-white text-black px-6 py-3 rounded text-lg font-medium"
      >
        Ver QR Code
      </button>
    </main>
  )
}
