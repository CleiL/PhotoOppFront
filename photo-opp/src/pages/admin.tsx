'use client'
import { useEffect, useState } from 'react'

type Stats = { dia: string, total: number }
type Photo = { id: number, url: string, criado_em: string }

export default function Admin() {
  const [stats, setStats] = useState<Stats[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/stats/daily')
      .then(res => res.json())
      .then(data => setStats(data))

    fetch('http://localhost:3001/photos')
      .then(res => res.json())
      .then(data => setPhotos(data))
  }, [])

  return (
    <main className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center"> Painel Administrativo</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3"> Participações por Dia</h2>
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
        <h2 className="text-xl font-semibold mb-3"> Fotos Capturadas</h2>
        <ul className="bg-gray-800 p-4 rounded shadow space-y-3">
          {photos.map(photo => (
            <li key={photo.id} className="text-sm">
              <a
                href={photo.url}
                target="_blank"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Ver Foto #{photo.id}
              </a>
              <span className="text-gray-400 ml-2">({photo.criado_em})</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
