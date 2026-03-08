import supabase from '../lib/supabase'

export const getServerSideProps = async ({ res }) => {
  const siteUrl = 'https://seo.mustpsc.in'

  let questions = []
  let from = 0
  const batchSize = 1000

  while (true) {
    const { data, error } = await supabase
      .from('questions')
      .select('slug')
      .range(from, from + batchSize - 1)

    if (error) break

    if (!data || data.length === 0) break

    questions = questions.concat(data)

    if (data.length < batchSize) break

    from += batchSize
  }

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