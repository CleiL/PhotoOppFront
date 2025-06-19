'use client'
import Image from "next/image"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#d9d9d9] flex flex-col items-center justify-between py-8 px-4">

      {/* Topo com logo */}
      <div className="w-full flex justify-center mt-6">
        <Image src="/images/logo-nexlab.svg" alt="NEX Lab" width={120} height={166} />
      </div>

      {/* Texto central */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-5xl font-extrabold text-black text-center leading-tight">
          Photo<br />Opp
        </h1>
      </div>

      {/* Botão Iniciar */}
      <button
        title="Iniciar"
        onClick={() => router.push('/loading')}
        className="w-full max-w-xs bg-gray-700 text-white text-sm font-semibold py-3 rounded shadow mb-6"
      >
        Iniciar
      </button>

      <p className="mt-4 text-sm text-center">
        <a href="/admin" className="text-blue-600 underline">Ir para painel administrativo</a>
      </p>

    </main>
  )
}
