'use client'
import { useRef } from 'react'
import Webcam from 'react-webcam'
import { useRouter } from 'next/router'

export default function Capture() {
  const webcamRef = useRef<Webcam>(null)
  const router = useRouter()

  const handleStartCountdown = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot()
      if (image) {
        localStorage.setItem('capturedImage', image)
        router.push('/countdown')
      }
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between pt-4 pb-8">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover flex-1"
        videoConstraints={{ facingMode: 'user' }}
      />

      <button
        title="Start Countdown"
        onClick={handleStartCountdown}
        className="w-20 h-20 border-4 border-gray-400 rounded-full"
      />
    </main>
  )
}
