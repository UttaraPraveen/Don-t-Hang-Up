import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    // 1. We now extract BOTH genre and topicLength from the request
    const { genre, topicLength } = await req.json();
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing from .env.local");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

    // 2. Dynamic Prompting: Change instructions based on the mode
    let prompt = "";
    if (topicLength === "word") {
      prompt = `Act as a mysterious voice on a vintage telephone. Give me EXACTLY ONE WORD as a provocative impromptu speaking prompt for the genre: ${genre}. Output ONLY the single word, nothing else. No punctuation.`;
    } else {
      prompt = `Act as a mysterious voice on a vintage telephone. Give me ONE short, provocative impromptu speaking topic for the genre: ${genre}. The topic should be a phrase or short sentence (15 words or less). Do not use intro text, just the topic.`;
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return new Response(JSON.stringify({ topic: text.trim() }), { status: 200 });
  } catch (error) {
    console.error("GEMINI API ERROR:", error); 
    return new Response(JSON.stringify({ topic: "Operator Error. Check Terminal." }), { status: 500 });
  }
}