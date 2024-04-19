/**
 * API route for getting image data
 * @param {Request} req
 * @returns image data or error
 */
export async function GET(req) {
  const city = req.nextUrl.searchParams.get("city");
  console.log(city);

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${city}&client_id=sp4PYBTZuQa_CXlLFIEpw8W4a8J6cqALuhgkHsFWNJs`
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Image not found" }), {
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
