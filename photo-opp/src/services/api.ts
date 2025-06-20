const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getDailyStats() {
  const res = await fetch(`${baseUrl}/stats/daily`);
  if (!res.ok) throw new Error('Erro ao buscar estatísticas');
  return res.json();
}

export async function getPhotos() {
  const res = await fetch(`${baseUrl}/photos`);
  if (!res.ok) throw new Error('Erro ao buscar fotos');
  return res.json();
}

export async function uploadBase64Image(base64: string) {
  const blob = await (await fetch(base64)).blob();
  const formData = new FormData();
  formData.append('foto', blob, 'captura.png');

  const response = await fetch(`${baseUrl}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Erro no upload');

  return response.json(); // deve conter { imageUrl, id }
}

export async function getPhotoUrl(imageId: string) {
  const res = await fetch(`${baseUrl}/photo/${imageId}`);
  if (!res.ok) throw new Error('Erro ao buscar foto final');
  return res.json(); // deve retornar { imageUrl: string }
}

