import supabase from '../../lib/supabase'

export async function getServerSideProps(context) {

  const { slug } = context.params

  const { data } = await supabase
    .from('questions')
    .select('*')
    .eq('slug', slug)
    .limit(1)

  return {
    props: {
      question: data?.[0] || null
    }
  }
}

export default function QuestionPage({ question }) {

  if (!question) return <div>Question not found</div>

  const subjectClean = question.subject
    ? question.subject.replace(/^\d+\.\s*/, '')
    : ''

  const topicClean = question.topic
    ? question.topic.replace(/^\d+\.\s*/, '')
    : ''

  return (
    <div className="page-wrapper">

      {/* MUST PSC Header */}
      <header>
        <div className="site-header">
          <a className="floating-home-symbol" href="/">⌂</a>

          <span className="title">MUST PSC</span>

          <a
            href="https://mustpsc.in/login.html"
            className="auth-btn"
          >
            Login / Sign Up
          </a>
        </div>
      </header>

      {/* MUST PSC Main Navigation (same structure as nav.js) */}
      <nav
        id="bottomNav"
        style={{
          width:"100%",
          background:"white",
          borderBottom:"1px solid #ddd",
          display:"flex",
          justifyContent:"space-around",
          alignItems:"center",
          padding:"10px 0",
          boxShadow:"0 2px 6px rgba(0,0,0,0.05)",
          fontSize:"14px",
          zIndex:100
        }}
      >
        <a href="https://mustpsc.in/home.html">Home</a>
        <a href="https://mustpsc.in/tests.html">Tests</a>
        <a href="https://mustpsc.in/mistakes.html">Mistake analyser</a>
        <a href="https://mustpsc.in/reattempt.html">Re-attempt</a>
        <a href="https://mustpsc.in/profile.html">Profile</a>
      </nav>

      <div className="container">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="https://mustpsc.in" style={{textDecoration:"none"}}>Home</a> › {subjectClean} › {topicClean}
      </div>

      {/* Subject */}
      <h1 className="subject-title">
        {subjectClean}
      </h1>

      {/* Topic */}
      <h2 className="topic-subtitle">
        {topicClean}
      </h2>

      {/* Question */}
      <div className="question-text">
        {question.question_text || question.question}
      </div>

      {/* Exam / Year */}
      <div className="exam-info">
        Asked in: {question.source_exam_name || question.exam}
      </div>

      {/* Options */}
      <ul className="options-list">
        <li className={`option-card ${question.correct_option === 'A' ? 'option-correct' : ''}`}>
          <strong>A.</strong> {question.option_a}
        </li>

        <li className={`option-card ${question.correct_option === 'B' ? 'option-correct' : ''}`}>
          <strong>B.</strong> {question.option_b}
        </li>

        <li className={`option-card ${question.correct_option === 'C' ? 'option-correct' : ''}`}>
          <strong>C.</strong> {question.option_c}
        </li>

        <li className={`option-card ${question.correct_option === 'D' ? 'option-correct' : ''}`}>
          <strong>D.</strong> {question.option_d}
        </li>
      </ul>

      {/* Correct Answer */}
      <div className="answer-box">
        Answer: {question.correct_option}
      </div>

      {/* Explanation */}
      <div className="explanation-card">
        <strong>Explanation:</strong>
        <p style={{marginTop:"8px"}}>{question.explanation}</p>
      </div>

      {/* Practice CTA */}
      <div className="cta-wrapper">
        <a
          href="https://mustpsc.in/tests.html"
          className="cta-practice"
        >
          Practice More Questions on MUST PSC
        </a>
      </div>

      </div>
    </div>
  )
}