import { HARSHAI_SYSTEM_PROMPT } from "@/config/harshaiPrompt";

export async function POST(req) {
  const body = await req.json();
  const userMessage = body.message;

  if (!userMessage) {
    return new Response(JSON.stringify({ reply: "Please send a message." }), {
      status: 400,
    });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-vercel-app.vercel.app", // ✅ replace with your actual Vercel domain
        "X-Title": "HarshAI Chat",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // ✅ FREE model
        messages: [
          HARSHAI_SYSTEM_PROMPT,
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content;

    if (!response.ok || !reply) {
      return new Response(
        JSON.stringify({ reply: "The AI is busy or returned an error." }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (err) {
    console.error("❌ Chat API Error:", err);
    return new Response(
      JSON.stringify({ reply: "Something went wrong. Please try again later." }),
      { status: 500 }
    );
  }
}
