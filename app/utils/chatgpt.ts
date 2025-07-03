import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is set
  organization: 'org-pKaif0TlmD2oodnPGsdnFQQ4'
});

export async function callGPT(prompt: string) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    stream: true,
  });

  const responses = [];
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
    //   process.stdout.write(content);
        responses.push(content);
    }
  }

  return responses.join(' ');
}

// streamChat();