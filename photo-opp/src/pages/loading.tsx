import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Loading() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/capture') // redireciona para a próxima etapa
    }, 2000) // 2 segundos

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-200">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-800 border-solid" />
    </main>
  )
}
