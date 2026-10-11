import { PenTool, Users, Zap, MousePointer2, Share2, Layers, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';





function CosmicBackground() {
  const stars = [
    { top: '6%', left: '12%', size: 1, delay: '0s' },
    { top: '10%', left: '40%', size: 1, delay: '1s' },
    { top: '4%', left: '65%', size: 2, delay: '0.5s' },
    { top: '15%', left: '85%', size: 1, delay: '1.5s' },
    { top: '20%', left: '30%', size: 1, delay: '0.8s' },
    { top: '8%', left: '55%', size: 1, delay: '2s' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden ">
      {/* Faint stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/60 animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* Small planet — top right */}
      <div className="absolute top-[12%] right-[10%] animate-float-planet">
        <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-600/40 to-indigo-800/40" />
      </div>

      {/* Tiny planet — lower left */}
      <div className="absolute top-[55%] left-[6%] animate-drift">
        <div className="h-6 w-6 rounded-full bg-linear-to-br from-orange-500/30 to-rose-700/30" />
      </div>

      {/* Subtle horizon glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-150 rounded-full bg-amber-500/8 blur-3xl" />
    </div>
  );
}

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: 'Real-time collaboration',
      desc: 'Draw together with your team in real time. See every stroke as it happens, no refresh needed.',
    },
    {
      icon: Zap,
      title: 'Lightning fast',
      desc: 'Powered by WebSockets for instant sync. Every cursor, every line — delivered in milliseconds.',
    },
    {
      icon: MousePointer2,
      title: 'Live cursors',
      desc: "See everyone's cursor move live on the canvas. Know exactly where your teammates are drawing.",
    },
    {
      icon: Layers,
      title: 'Infinite canvas',
      desc: 'Never run out of space. Pan, zoom, and sketch across an unlimited workspace.',
    },
    {
      icon: Share2,
      title: 'One-click sharing',
      desc: 'Invite anyone with a link. No accounts required to view — just open and start collaborating.',
    },
    {
      icon: PenTool,
      title: 'Sketch anything',
      desc: 'Freehand drawing, shapes, text, and more. Everything you need to bring ideas to life.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Create a board',
      desc: 'Sign up and start a new sketch board in one click. Your canvas is ready instantly.',
    },
    {
      num: '02',
      title: 'Invite your team',
      desc: 'Share a link with anyone. They join in real time — no download or setup required.',
    },
    {
      num: '03',
      title: 'Sketch together',
      desc: 'Draw, annotate, and brainstorm in real time. Every stroke syncs instantly via WebSocket.',
    },
  ];

  return (
    <>
      <CosmicBackground />
      <main className="relative ">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="relative mx-auto max-w-7xl px-6 text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
              <Sparkles size={14} className="text-amber-300" />
              Now with live cursor tracking
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl">
              Sketch together,
              <br />
              <span className="bg-linear-to-r from-amber-200 via-orange-300 to-rose-400 bg-clip-text text-transparent">
                in real time
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 drop-shadow sm:text-xl">
              Sketchy is a collaborative whiteboard where your team can draw, brainstorm,
              and design together — live, seamless, and effortless.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={"/signup"}>
              <button
                className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-8 py-3.5 text-base font-semibold text-[#1a0a2e] shadow-xl shadow-orange-500/30 transition hover:brightness-110 hover:shadow-orange-500/50"
              >
                Start sketching free
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                
              </button>
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                See how it works
              </a>
            </div>

            {/* Canvas preview mockup */}
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-2 shadow-2xl backdrop-blur-md">
                <div className="rounded-xl bg-[#0a0a1a]/80 overflow-hidden">
                  {/* Window bar */}
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-rose-500/70" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                    <div className="ml-3 text-xs text-white/40">sketchy.app/board/design-session</div>
                  </div>

                  {/* Canvas area */}
                  <div className="relative h-80 sm:h-105 bg-linear-to-br from-[#1a0a2e]/80 to-[#2d1b4e]/60">
                    {/* Grid */}
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: 'radial-linear(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '24px 24px',
                      }}
                    />

                    {/* Mock strokes */}
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                      <path
                        d="M 80 120 Q 140 60, 220 100 T 360 90 Q 420 70, 480 120"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="animate-draw"
                      />
                      <path
                        d="M 150 250 C 200 200, 300 280, 380 230 S 520 200, 580 260"
                        fill="none"
                        stroke="#f472b6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="animate-draw-delayed"
                      />
                      <circle cx="620" cy="130" r="40" fill="none" stroke="#f97316" strokeWidth="3" className="animate-draw-delayed-2" />
                      <rect x="420" y="280" width="120" height="70" rx="8" fill="none" stroke="#c084fc" strokeWidth="3" className="animate-draw-delayed-3" />
                      <path d="M 250 180 L 330 180 M 290 150 L 290 210" stroke="#34d399" strokeWidth="3" strokeLinecap="round" className="animate-draw-delayed-4" />
                    </svg>

                    {/* Live cursors */}
                    <div className="absolute left-[30%] top-[35%] animate-cursor-1">
                      <MousePointer2 className="text-amber-400 fill-amber-400/20" size={20} />
                      <span className="ml-4 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-medium text-[#1a0a2e]">Alex</span>
                    </div>
                    <div className="absolute left-[55%] top-[60%] animate-cursor-2">
                      <MousePointer2 className="text-pink-400 fill-pink-400/20" size={20} />
                      <span className="ml-4 rounded bg-pink-500 px-1.5 py-0.5 text-[10px] font-medium text-white">Sam</span>
                    </div>
                    <div className="absolute left-[72%] top-[25%] animate-cursor-3">
                      <MousePointer2 className="text-orange-400 fill-orange-400/20" size={20} />
                      <span className="ml-4 rounded bg-orange-500 px-1.5 py-0.5 text-[10px] font-medium text-[#1a0a2e]">Jordan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="relative py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
                Everything you need to create together
              </h2>
              <p className="mt-4 text-lg text-white/60">
                Powerful collaborative tools wrapped in a clean, intuitive interface.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:border-amber-400/20 hover:bg-white/10"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-amber-400/20 to-orange-500/20 ring-1 ring-amber-400/30 transition group-hover:from-amber-400/30 group-hover:to-orange-500/30">
                    <feature.icon className="text-amber-300" size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="relative py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
                How it works
              </h2>
              <p className="mt-4 text-lg text-white/60">
                From blank canvas to collaborative masterpiece in three steps.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.num} className="relative">
                  {i < steps.length - 1 && (
                    <div className="absolute left-[60%] top-8 hidden h-px w-[80%] bg-linear-to-r from-amber-400/30 to-transparent md:block" />
                  )}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400/20 to-rose-500/10 ring-1 ring-amber-400/20 backdrop-blur-md">
                    <span className="text-xl font-bold text-amber-300">{step.num}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase / stats */}
        <section id="showcase" className="relative py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
                  Built for teams that think visually
                </h2>
                <p className="mt-4 text-lg text-white/60">
                  Whether you're wireframing a product, mapping a user journey, or just
                  doodling ideas — Sketchy keeps everyone on the same page, literally.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-amber-300">10k+</div>
                    <div className="mt-1 text-sm text-white/50">Boards created</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-300">50+</div>
                    <div className="mt-1 text-sm text-white/50">Teams sketching</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-300">0ms</div>
                    <div className="mt-1 text-sm text-white/50">Sync latency</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                  <div className="space-y-4">
                    {[
                      { user: 'Alex', color: 'bg-amber-500', text: 'added a wireframe mockup', time: 'now' },
                      { user: 'Sam', color: 'bg-pink-500', text: 'annotated the login flow', time: '2s ago' },
                      { user: 'Jordan', color: 'bg-orange-500', text: 'drew a new component', time: '5s ago' },
                      { user: 'Riley', color: 'bg-purple-500', text: 'highlighted a key area', time: '8s ago' },
                    ].map((item) => (
                      <div key={item.user} className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color} text-xs font-bold text-[#1a0a2e]`}>
                          {item.user[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white/70">
                            <span className="font-medium text-white">{item.user}</span> {item.text}
                          </p>
                        </div>
                        <span className="text-xs text-white/40">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-full bg-amber-500/20 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-linear-to-br from-[#1a0a2e]/60 to-[#4a1a5e]/40 px-8 py-16 text-center backdrop-blur-md">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
              <div className="absolute -bottom-20 right-10 h-40 w-40 rounded-full bg-purple-500/15 blur-3xl" />
              <h2 className="relative text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
                Ready to sketch together?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/60">
                Join thousands of teams who use Sketchy to collaborate visually.
                Free to start — no credit card required.
              </p>
              <Link href={"/signup"}>
              <button
                className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 px-8 py-3.5 text-base font-semibold text-[#1a0a2e] shadow-xl shadow-orange-500/30 transition hover:brightness-110 hover:shadow-orange-500/50"
              >
                Create your free account
                <ArrowRight size={18} />
              </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
                <PenTool className="text-[#1a0a2e]" size={18} />
              </div>
              <span className="text-lg font-bold">Sketchy</span>
            </div>
            <p className="text-sm text-white/40">
              © 2026 Sketchy. Drawn together under the stars.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
