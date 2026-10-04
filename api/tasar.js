// Función serverless (Vercel). La clave NUNCA va en el navegador: se guarda en la variable de entorno ANTHROPIC_API_KEY.
const PROMPT = 'Eres un experto en cartas coleccionables (especialmente cartas Pokémon TCG). Analiza la foto: identifica el nombre de la carta, la colección o expansión, el número si es legible, la versión (holo, reverse holo, 1ª edición, etc.) y el idioma. Estima su precio de mercado actual aproximado en euros (EUR) para una carta sin graduar en el estado que se aprecia. Si no es una carta coleccionable o no puedes identificarla, dilo con confianza baja. Responde SOLO con JSON con esta forma exacta: {"objeto":"nombre de la carta","coleccion":"expansión/colección","detalles":"número, versión e idioma","precio_min":número,"precio_max":número,"estado":"nueva|casi nueva|buena|jugada|dañada|desconocido","confianza":"alta|media|baja","justificacion":"2-3 frases en español explicando la estimación"}';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'metodo' });
  const image = req.body && req.body.image;
  if (!image || typeof image !== 'string' || image.length > 3500000) return res.status(400).json({ error: 'imagen' });
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: process.env.MODEL || 'claude-sonnet-5-5',
        max_tokens: 700,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: PROMPT }
        ] }]
      })
    });
    if (!r.ok) return res.status(502).json({ error: 'ia' });
    const j = await r.json();
    const t = (j.content || []).map(c => c.text || '').join('');
    const m = t.match(/\{[\s\S]*\}/);
    return res.status(200).json(JSON.parse(m[0]));
  } catch (e) {
    return res.status(500).json({ error: 'fallo' });
  }
};
