import Head from 'next/head'
import supabase from '../../lib/supabase'
import Link from 'next/link'

export async function getServerSideProps(context) {

  const { topic } = context.params
  const topicName = topic.replace(/-/g, ' ')

  const { data: questions } = await supabase
    .from('questions')
    .select('slug, question_text, question, topic')
    .ilike('topic', `%${topicName}%`)

  return {
    props: {
      questions: questions || [],
      topic: topicName
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
        <link rel="canonical" href={`https://mustpsc.in/topic/${topic.replace(/\s+/g,'-')}`} />
      
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