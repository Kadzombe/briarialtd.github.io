// Vercel serverless function (Node 18+) - save as /api/openai.js
import fetch from 'node-fetch';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, model = 'gpt-3.5-turbo', max_tokens = 600, temperature = 0.2 } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array in request body' });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const r = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({ model, messages, max_tokens, temperature })
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('OpenAI error', r.status, text);
      return res.status(502).json({ error: 'OpenAI API error', detail: text });
    }

    const json = await r.json();
    const reply = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || null;
    if (!reply) return res.status(500).json({ error: 'No reply from OpenAI' });

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
