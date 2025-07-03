// import OpenAI from "openai";
// const client = new OpenAI();
// //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


// export const callGPT = async(prompt: string) => {
//     const response = await client.responses.create({
//         model: "gpt-4.1",
//         input: "Write a one-sentence bedtime story about a unicorn.",
//         stream: true
//     });
    
//     console.log(response);
//     return response;
// }


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