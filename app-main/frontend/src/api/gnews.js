export async function fetchRelatedNews(query) {
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&lang=en&max=5&apikey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.articles || [];
}
