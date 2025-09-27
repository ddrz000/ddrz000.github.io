import React, { useMemo, useRef, useState } from 'react'

const SEGMENTS = [
  'JOYCASINO',
  'DRIFT CASINO',
  'CASINO X',
  'SOL CASINO',
  'COLUMBUS',
  'ARGO',
  'ASINO X',
  'DRIFT CASINO',
]

export default function App() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const wheelRef = useRef(null)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)

    const targetIndex = Math.floor(Math.random() * SEGMENTS.length)
    const turns = 6
    const slice = 360 / SEGMENTS.length
    const targetAngle = 360 - (targetIndex * slice + slice / 2)
    const final = turns * 360 + targetAngle

    const wheel = wheelRef.current
    wheel.style.transition = 'transform 3.2s cubic-bezier(0.22, 1, 0.36, 1)'
    wheel.style.transform = `rotate(${final}deg)`

    const onEnd = () => {
      wheel.removeEventListener('transitionend', onEnd)
      setSpinning(false)
      setResult(SEGMENTS[targetIndex])
    }
    wheel.addEventListener('transitionend', onEnd)
  }

  const conic = useMemo(() => {
    const colors = ['#191412', '#231c18']
    const steps = []
    const step = 100 / SEGMENTS.length
    for (let i = 0; i < SEGMENTS.length; i++) {
      const c = colors[i % colors.length]
      const from = i * step
      const to = (i + 1) * step
      steps.push(`${c} ${from}% ${to}%`)
    }
    return `conic-gradient(${steps.join(',')})`
  }, [])

  return (
    <main className="min-h-screen bg-[#0b0a09] text-amber-200 selection:bg-amber-400/30">
      <header className="border-b border-amber-800/30 bg-[#12100e]/80 sticky top-0 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="hidden md:flex gap-8 tracking-wide text-sm">
            {['CASINO X', 'COLUMBUS', 'ARGO CASINO', 'AZINO777'].map((i) => (
              <a key={i} href="#" className="hover:text-amber-300">
                {i}
              </a>
            ))}
          </nav>
          <div className="ml-auto text-xs text-amber-400/80">DEMO / UI ONLY</div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <Tentacles />
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="relative mx-auto">
            <div
              aria-label="Колесо удачи"
              role="img"
              className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] border-[10px] border-amber-900/60"
              style={{ background: conic }}
              ref={wheelRef}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-[#0f0d0b] border-4 border-amber-900/60 shadow-inner" />
              </div>
              {SEGMENTS.map((label, i) => (
                <SegmentLabel key={i} index={i} total={SEGMENTS.length}>
                  {label}
                </SegmentLabel>
              ))}
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-amber-500 drop-shadow" />
            </div>
          </div>

          <aside className="bg-[#1a1512] rounded-2xl border border-amber-900/40 shadow-xl p-6 md:p-8">
            <div className="text-3xl md:text-4xl font-semibold tracking-wide">
              AZINO <span className="text-amber-400">777</span>
            </div>
            <div className="mt-4 text-4xl md:text-5xl font-black">100</div>
            <div className="text-lg md:text-xl text-amber-300/90">
              БЕСПЛАТНЫХ ВРАЩЕНИЙ
            </div>
            <p className="mt-4 text-amber-200/80 leading-relaxed">
              Крути колесо, чтобы получить демо-приз. Это учебный макет без реальных выплат и ссылок.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={spin}
                disabled={spinning}
                className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow-lg shadow-amber-900/40"
              >
                {spinning ? 'Крутится...' : 'Вращать'}
              </button>
              <button className="px-5 py-3 rounded-xl bg-amber-800/50 hover:bg-amber-700/60 border border-amber-900/60 font-semibold">
                Забрать бонус
              </button>
            </div>

            <div className="mt-4 text-sm text-amber-400/80 min-h-[1.5rem]">
              {result && (
                <span>
                  Выпало: <b>{result}</b>
                </span>
              )}
            </div>
          </aside>
        </div>
      </section>

      <footer className="border-t border-amber-900/30 py-8 text-center text-xs text-amber-400/70">
        Макет создан для демонстрации UI. Азартные игры могут быть ограничены законом в вашей юрисдикции.
      </footer>
    </main>
  )
}

function SegmentLabel({ index, total, children }) {
  const angle = (360 / total) * index + 360 / total / 2
  return (
    <div
      className="absolute left-1/2 top-1/2 origin-left text-[10px] sm:text-xs md:text-sm tracking-wide"
      style={{ transform: `rotate(${angle}deg) translateX(46%)` }}
    >
      <span className="block -rotate-90 font-medium text-amber-200/90 whitespace-nowrap">
        {children}
      </span>
    </div>
  )
}

function Tentacles() {
  return (
    <svg
      className="absolute inset-0 -z-10 opacity-20"
      aria-hidden
      width="100%"
      height="100%"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="g" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0e0c0a" />
          <stop offset="70%" stopColor="#0b0a09" />
          <stop offset="100%" stopColor="#070605" />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#g)" />
      <g fill="#2a1e16">
        <path d="M50,650 C220,520 190,380 340,330 C470,287 540,350 560,420 C580,490 520,540 470,560 C420,580 360,600 330,640 Z" />
        <path d="M1150,620 C980,540 940,430 820,390 C710,355 630,390 610,450 C590,510 640,560 700,580 C770,605 860,610 910,650 Z" />
      </g>
    </svg>
  )
}

export { }
