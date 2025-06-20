'use client'
import { getDailyStats, getPhotos, deletePhoto } from '@/services/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Stats = { dia: string, total: number }
type Photo = { id: number, url: string, criado_em: string }

export default function Admin() {
  const [stats, setStats] = useState<Stats[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [s, p] = await Promise.all([getDailyStats(), getPhotos()])
      setStats(s)
      setPhotos(p)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    }
  }

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Tem certeza que deseja excluir esta foto?')
    if (!confirm) return

    try {
      await deletePhoto(id)
      setPhotos(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Erro ao excluir:', err)
      alert('Erro ao excluir foto')
    }
  }

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Painel Administrativo</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Participações por Dia</h2>
        <ul className="bg-gray-800 p-4 rounded shadow">
          {stats.map((s, i) => (
            <li key={i} className="border-b border-gray-700 py-2 flex justify-between">
              <span>{s.dia}</span>
              <span className="font-bold">{s.total}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Fotos Capturadas</h2>
        <ul className="bg-gray-800 p-4 rounded shadow space-y-4">
          {photos.map(photo => (
            <li key={photo.id} className="text-sm flex justify-between items-center">
              <div>
                <a
                  href={photo.url}
                  target="_blank"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Ver Foto #{photo.id}
                </a>
                <span className="text-gray-400 ml-2">({photo.criado_em})</span>
              </div>
              <button
                onClick={() => handleDelete(photo.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-500"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => router.push('/')}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow hover:bg-white font-medium"
        >
          Voltar ao Início
        </button>
      </div>
    </main>
  )
}
