'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

export default function Countdown() {
  const [count, setCount] = useState(3)
  const router = useRouter()

  const uploadToServer = useCallback(async (base64: string) => {
    const blob = await (await fetch(base64)).blob()
    const formData = new FormData()
    formData.append('foto', blob, 'captura.png')

    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    localStorage.setItem('capturedImageUrl', data.imageUrl)
    localStorage.setItem('capturedImageId', String(data.id))
    router.push('/preview')
  }, [router])

  useEffect(() => {
    if (count > 1) {
      const timer = setTimeout(() => setCount(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (count === 1) {
      // Última contagem visível, esperar 1s antes de enviar e redirecionar
      const timeout = setTimeout(() => {
        const image = localStorage.getItem('capturedImage')
        if (image) uploadToServer(image)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [count, uploadToServer])

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black text-9xl font-bold">
      {count}
    </main>
  )
}
