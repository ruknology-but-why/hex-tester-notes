import OpenAI from 'openai';

const client = new OpenAI();

// Summarises a note in the team's preferred tone.
export async function summarize(req, note) {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You summarise notes for ' + req.body.team + '. Tone: ' + req.body.tone },
      { role: 'user', content: note.body },
    ],
  });
  return completion.choices[0].message.content;
}
