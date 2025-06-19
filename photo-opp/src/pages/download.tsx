'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import QRCode from 'react-qr-code'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Download() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedUrl = localStorage.getItem('capturedImageUrl')
    if (savedUrl) {
      setImageUrl(savedUrl)
    }
  }, [])

  const handleFinish = () => {
    router.push('/thankyou')
  }


  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-300 flex flex-col items-center justify-between py-6 px-4">
      {/* Retângulo principal */}
      <div className="bg-white rounded border border-gray-300 shadow w-full max-w-sm flex flex-col justify-between flex-1 relative">
        {/* Header */}
        <Header />

        {/* Imagem capturada */}
        <div className="flex items-center justify-center flex-1">
          {imageUrl ? (
            <div className="relative w-[280px] h-[360px] border border-gray-300 rounded overflow-hidden">
              <Image src={imageUrl} alt="Imagem capturada" fill className="object-cover" />
            </div>
          ) : (
            <p className="text-gray-500">Imagem não disponível.</p>
          )}
        </div>

        {/* QR Code flutuante no canto inferior direito */}
        {imageUrl && (
          <div className="absolute bottom-24 right-4 bg-white border border-gray-300 rounded p-3 w-40 shadow">
            <p className="text-xs font-medium text-gray-700 mb-2 text-center">Fazer download</p>
            <div className="bg-gray-100 p-2 rounded flex justify-center">
              <QRCode value={imageUrl} className="w-28 h-28" />
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>

      {/* Botão finalizar */}
      <button
        onClick={handleFinish}
        className="mt-4 w-full max-w-sm bg-gray-800 text-white font-semibold py-2 rounded shadow"
      >
        Finalizar
      </button>
    </main>
  )
}
