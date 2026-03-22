import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { genre } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Act as a mysterious voice on a vintage telephone. 
  Give me ONE short, provocative impromptu speaking topic for the genre: ${genre}. 
  The topic should be 15 words or less. Do not use intro text, just the topic.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return new Response(JSON.stringify({ topic: text }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Line Busy. Try again." }), { status: 500 });
  }
}