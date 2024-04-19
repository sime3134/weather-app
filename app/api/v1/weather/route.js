/**
 * API route for getting weather data
 * @param {Request} req
 * @returns weather data or error
 */
export async function GET(req) {
  const city = req.nextUrl.searchParams.get("city");

  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=3226c53da11f4dc996f142724231809&q=${city}&days=5&aqi=no&alerts=no`
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "City not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(await response.json()), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
