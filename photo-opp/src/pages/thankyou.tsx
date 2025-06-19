'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import QRCode from 'react-qr-code'

export default function ThankYou() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const imageId = localStorage.getItem('capturedImageId')

    if (imageId) {
      fetch(`http://localhost:3001/photo/${imageId}`)
        .then(res => res.json())
        .then(data => {
          setImageUrl(data.imageUrl)
        })
        .catch(err => {
          console.error('Erro ao buscar imagem:', err)
        })
    }

    const clearTimer = setTimeout(() => {
      localStorage.removeItem('capturedImage')
      localStorage.removeItem('capturedImageUrl')
    }, 2000)

    const redirectTimer = setTimeout(() => {
      router.push('/final')
    }, 5000)

    return () => {
      clearTimeout(clearTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-300 flex flex-col items-center justify-between py-6 px-4 relative">
      {/* Retângulo principal */}
      <div className="bg-white rounded border border-gray-300 shadow w-full max-w-sm flex flex-col justify-between flex-1 relative z-0">
        <Header />

        {/* QR Code ou espaço reservado */}
        <div className="flex-1 w-full flex items-center justify-center">
          {imageUrl ? (
            <div className="p-2 bg-white border border-gray-300 rounded">
              <QRCode value={imageUrl} className="w-32 h-32" />
            </div>
          ) : (
            <div className="w-32 h-32 bg-gray-100 rounded border border-gray-300 flex items-center justify-center text-gray-400">
              QR CODE
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* Botão Finalizar (desativado) */}
      <button
        disabled
        className="mt-4 w-full max-w-sm bg-gray-500 text-white font-semibold py-2 rounded shadow opacity-60 cursor-not-allowed"
      >
        Finalizar
      </button>

      {/* Sobreposição escura */}
      <div className="absolute inset-0 bg-gray-700 opacity-30 z-10 pointer-events-none" />

      {/* Mensagem Obrigado */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl p-6 rounded-lg text-center w-[80%] max-w-sm z-20">
        <h2 className="text-xl text-gray-800 font-bold mb-2">Obrigado!</h2>
        <p className="text-sm text-gray-600">Aproveite sua lembrança!</p>
      </div>
    </main>
  )
}
