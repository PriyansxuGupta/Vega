export const dynamic = 'force-static'

export default function sitemap() {
  return [
    {
      url: 'https://vega.js.org',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
