import {useState} from 'react';
import {questions} from '../data/questions';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [currentQuestion,setcurrentQuestion] = useState(0);
  const [answers,setanswers] = useState([]);
  const currentQ = questions[currentQuestion];
  const navigate = useNavigate();

  const handleAnswer = (option) => {
  setanswers([...answers, option])  // save answer
  if(currentQuestion === questions.length - 1) {
  localStorage.setItem('answers', JSON.stringify([...answers, option]))
  navigate('/results')
    } 
  else {
  setcurrentQuestion(currentQuestion + 1)
    } // move to next question
  }

return (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
    <div className="w-full max-w-xl">
      <div className="mb-8">
        <div className="flex justify-between text-white/40 text-sm mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round((currentQuestion / questions.length) * 100)}%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full">
          <div
            className="h-1 bg-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
        <h2 className="text-white text-2xl font-medium mb-8 leading-snug">
          {currentQ.question}
        </h2>
        <div className="flex flex-col gap-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="text-left px-5 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200 text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
)
}

export default Home