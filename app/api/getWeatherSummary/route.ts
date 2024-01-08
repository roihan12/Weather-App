import { NextResponse } from "next/server";
import openai from "@/openai";
import { json } from "stream/consumers";
export async function POST(request: Request) {
  // weatherdata in teh body of the post re

  const { weatherData } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you" re a weather news presenter presenting LIVE on television. be energetic and full of
        charisma. Introduce yourself as Roihan and say you are LIVE from the studio News. State the city
        you are providing a summary for. Then give a summary of todays weather only. Make it easy for the viewer to
        understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high
         etc. use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data came from your team at the news oofice and not the user.`,
      },
      {
        role: "user",
        content: `Hi there, can i get a summary of todays waether, use the following information to get the weather data: ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  console.log("DATA IS", response);

  return NextResponse.json(response.choices[0].message.content);
}
