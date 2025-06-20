'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { uploadBase64Image } from '@/services/api'

export default function Countdown() {
  const [count, setCount] = useState(3)
  const router = useRouter()

  const uploadToServer = useCallback(async (base64: string) => {
    try {
      const data = await uploadBase64Image(base64)
      localStorage.setItem('capturedImageUrl', data.imageUrl)
      localStorage.setItem('capturedImageId', String(data.id))
      router.push('/preview')
    } catch (err) {
      console.error('Erro ao fazer upload:', err)
    }
  }, [router])

  useEffect(() => {
    if (count > 1) {
      const timer = setTimeout(() => setCount(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (count === 1) {
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
