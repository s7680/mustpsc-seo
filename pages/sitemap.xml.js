import supabase from '../lib/supabase'

export const getServerSideProps = async ({ res }) => {
  const siteUrl = 'https://seo.mustpsc.in'

  const { data: questions } = await supabase
    .from('questions')
    .select('slug')

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