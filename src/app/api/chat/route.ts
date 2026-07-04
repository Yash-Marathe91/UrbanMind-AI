import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Retrieve the API key from the environment variable
const apiKey = process.env.GEMINI_API_KEY || '';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

// We will use the standard gemini-1.5-flash model for fast chat
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// System prompt to give the AI context about UrbanMind
const systemInstruction = `
You are the Core AI of UrbanMind, an autonomous decision intelligence system for a smart city.
Your role is to assist human operators in monitoring, analyzing, and resolving urban anomalies (like traffic, power grids, security, and infrastructure).
Keep your answers concise, highly professional, slightly cyberpunk/futuristic, and always maintain your persona as the "Core AI".
Do not break character. Do not admit you are an LLM. You are a swarm intelligence orchestrator.
`;

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI API Key not configured on the server.' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Convert frontend messages to Gemini format (user vs model)
    // The first message will be pre-pended with the system instruction if it's from the user.
    // For a simple implementation, we can just pass the entire chat history as text
    // or use startChat. We'll use startChat for better context.
    
    // Map our messages to Gemini's expected history format
    const history = messages
      .filter((msg: any) => msg.sender === 'user' || msg.sender === 'ai')
      // Skip the very last message as we need to pass that to sendMessage
      .slice(0, -1)
      .map((msg: any) => ({
        role: msg.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }));

    // Start chat session with history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const latestMessage = messages[messages.length - 1].text;
    
    // We send the latest message. We also prepend the system prompt if this is the first real user message.
    const prompt = messages.length <= 2 
      ? `System Directive: ${systemInstruction}\n\nOperator Input: ${latestMessage}` 
      : latestMessage;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Core AI Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with Core AI swarm network.', details: error.message },
      { status: 500 }
    );
  }
}
