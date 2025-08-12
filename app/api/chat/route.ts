// app/api/chat/route.ts
import { streamText, type CoreMessage } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { getRelevantContext } from '@/lib/rag';
import { getCurrentTime } from '@/lib/tools';

const groq = createGroq();
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: CoreMessage[] };

  const latestMessage = messages[messages.length - 1];
  const userQuery = typeof latestMessage.content === 'string' ? latestMessage.content : '';
  const context = await getRelevantContext(userQuery);

  const systemPrompt = `You are a helpful assistant. Use the following information to answer the user's question. If the information is not relevant, answer based on your general knowledge.
  ---
  Context:
  ${context}
  ---`;

  const result = await streamText({
    model: groq('llama3-8b-8192'),
    system: systemPrompt,
    messages,
    tools: { getCurrentTime },
  });

  // This is the correct method for your version of the AI SDK.
  return result.toTextStreamResponse();
}