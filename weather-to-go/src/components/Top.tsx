import { useNavigate } from 'react-router-dom'

function Top() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home')
  }

  return (
     <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f8fafc] to-[#e6eefc] text-center px-6">
      <div className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-xl">
        <div className="text-5xl md:text-6xl font-semibold text-slate-800 mb-8 tracking-tight">
          Weather To Go
        </div>

        <div className="text-slate-500 text-lg md:text-xl font-light mb-12 leading-relaxed">
          天気がわかる。<br className="md:hidden" />
          あなたの行動がもっとクリアになる。
        </div>

        <button
          onClick={handleClick}
          className="px-12 py-4 text-lg font-medium rounded-xl text-white bg-sky-500 hover:bg-sky-600 active:scale-[0.98] focus:outline-none transition-colors duration-200"
        >
          はじめる
        </button>
      </div>
    </div>
  )
}

export default Top
