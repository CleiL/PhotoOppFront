'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import QRCode from 'react-qr-code'
import Image from 'next/image'

export default function Final() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
  const imageId = localStorage.getItem('capturedImageId')
  if (!imageId) return

  // Buscar URL da imagem
  fetch(`http://localhost:3001/photo/${imageId}`)
    .then(res => res.json())
    .then(data => setImageUrl(data.imageUrl))
    .catch(err => console.error('Erro ao buscar imagem final:', err))

  // Redirecionar para a tela inicial após 10 segundos
  const timer = setTimeout(() => {
    localStorage.clear()
    router.push('/')
  }, 10000)

  return () => clearTimeout(timer)
}, [router])


  const handleRestart = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-300 flex flex-col items-center justify-between py-6 px-4">
      {/* Header com logo */}
      <div className="w-full flex justify-center items-center mb-2">
        <Image
          src="/images/logo-nexlab.svg"
          alt="NEX.lab logo"
          width={100}
          height={40}
        />
      </div>

      {/* Mensagem e QR Code */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Obrigado!</h1>
        <p className="text-sm text-gray-600 mb-6 text-center px-4">
          Aqui está seu QR Code para acessar a foto!
        </p>

        {imageUrl ? (
          <div className="w-44 h-44 bg-white border border-gray-400 rounded flex items-center justify-center mb-8">
            <QRCode value={imageUrl} className="w-32 h-32" />
          </div>
        ) : (
          <div className="w-44 h-44 bg-gray-100 border border-gray-300 rounded flex items-center justify-center mb-8 text-xs text-gray-500">
            Carregando QR Code...
          </div>
        )}
      </div>

      {/* Botão Finalizar */}
      <button
        onClick={handleRestart}
        className="w-full max-w-sm bg-gray-800 text-white py-2 rounded font-semibold shadow"
      >
        Finalizar
      </button>
    </main>
  )
}
