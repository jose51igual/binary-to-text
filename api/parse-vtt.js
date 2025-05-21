export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Leer el binario del cuerpo
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    const text = buffer.toString('utf-8');

    // Puedes hacer limpieza del VTT si quieres aquí
    const cleanText = text
      .split('\n')
      .filter(line => !line.match(/^[0-9]{2}:[0-9]{2}/) && !line.match(/^[0-9]+$/))
      .join('\n')
      .trim();

    res.status(200).json({ text: cleanText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
