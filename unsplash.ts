export async function getImageForKeyword(keyword: string, apiKey: string) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${apiKey}`,
    },
  };

  const url = new URL("/photos/random", "https://api.unsplash.com");
  url.searchParams.set("query", keyword);

  const res = await fetch(
    url,
    options,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch image for keyword ${keyword}`);
  }
  const data = await res.json();
  return data.urls.small as string;
}
