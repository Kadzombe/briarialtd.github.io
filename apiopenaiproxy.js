// Vercel / Node-style serverless function (deploy to /api/openai)
// - Requires an environment variable OPENAI_API_KEY to be set in your hosting environment
// - This is a simple proxy that sends the provided messages to OpenAI Chat Completions API
// - The frontend posts { messages: [{role, content}, ...], model: "gpt-3.5-turbo" } to this endpoint
//
// Usage:
// POST /api/openai
// Body: { messages: [{ role: 'user'|'assistant'|'system', content: '...' }, ...], model: 'gpt-3.5-turbo' }
//
// Response:
// { reply: "assistant text" }
//
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const messages = body.messages;
  const model = body.model || 'gpt-3.5-turbo';

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array in request body' });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'OpenAI API key not configured in server environment' });
  }

  try {
    const resp = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 600,
        temperature: 0.2
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('OpenAI error', resp.status, text);
      return res.status(502).json({ error: 'OpenAI API error', detail: text });
    }

    const json = await resp.json();
    // Chat completions: json.choices[0].message.content
    const reply = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || null;

    if (!reply) {
      return res.status(500).json({ error: 'No reply from OpenAI' });
    }

    // Return a simple JSON payload for the frontend
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
