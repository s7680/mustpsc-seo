import supabase from '../lib/supabase'

export const getServerSideProps = async ({ res }) => {
  const siteUrl = 'https://seo.mustpsc.in'

  let questions = []
  let from = 0
  const batchSize = 1000

  while (true) {
    const { data, error } = await supabase
      .from('questions')
      .select('slug, topic')
      .range(from, from + batchSize - 1)

    if (error) break

    if (!data || data.length === 0) break

    questions = questions.concat(data)

    if (data.length < batchSize) break

    from += batchSize
  }

  const topicSet = new Set()

  questions.forEach(q => {
    if (q.topic) {
      const topicSlug = q.topic
        .toLowerCase()
        .replace(/^\d+\.\s*/, '')   // remove leading numbering like "16. "
        .replace(/\s+/g, '-')       // convert spaces to hyphen
        .replace(/[^a-z0-9\-]/g, '') // remove punctuation
      topicSet.add(topicSlug)
    }
  })

  const topicUrls = Array.from(topicSet)
    .map(t => `
      <url>
        <loc>${siteUrl}/topic/${t}</loc>
      </url>
    `)
    .join('')

  const urls = (questions || [])
    .map(q => `
      <url>
        <loc>${siteUrl}/mcq/${q.slug}</loc>
      </url>
    `)
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
    ${topicUrls}
  </urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default function Sitemap() {
  return null
}