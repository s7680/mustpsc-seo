import Head from 'next/head'
import supabase from '../../lib/supabase'
import Link from 'next/link'

export async function getServerSideProps(context) {

  const { topic } = context.params

  const { data } = await supabase
    .from('questions')
    .select('slug, question_text, question')
    .ilike('topic', `%${topic}%`)
    .limit(200)

  return {
    props: {
      questions: data || [],
      topic
    }
  }
}

export default function TopicPage({ questions, topic }) {

  return (
    <div className="page-wrapper">

      <Head>
        <title>{topic} MCQ | MUST PSC</title>
        <meta
          name="description"
          content={`Practice MCQ questions on ${topic} with explanations.`}
        />
      </Head>

      <div className="container">

        <h1 className="subject-title">
          {topic} MCQ Questions
        </h1>

        <ul style={{marginTop:"20px"}}>

          {questions.map(q => (
            <li key={q.slug} style={{marginBottom:"12px"}}>

              <Link href={`/mcq/${q.slug}`}>
                {q.question_text || q.question}
              </Link>

            </li>
          ))}

        </ul>

      </div>

    </div>
  )
}