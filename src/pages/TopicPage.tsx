import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { topics } from "@/data/topics"
import Icon from "@/components/ui/icon"

export default function TopicPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const topic = topics.find((t) => t.id === id)
  const currentIndex = topics.findIndex((t) => t.id === id)
  const prev = currentIndex > 0 ? topics[currentIndex - 1] : null
  const next = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [id])

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Тема не найдена</p>
          <button onClick={() => navigate("/")} className="text-sage underline text-sm">
            На главную
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 lg:px-16 py-5 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <Icon name="ArrowLeft" size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-xs tracking-widest uppercase">Все темы</span>
        </button>
        <div className="w-px h-4 bg-border" />
        <p className="font-serif text-lg text-foreground tracking-wide hidden sm:block">Профессиональная коммуникация</p>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 lg:px-16 py-16 max-w-3xl">
        {/* Meta */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <div className={`text-${topic.color}`}>
            <Icon name={topic.icon} size={20} strokeWidth={1} />
          </div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">{topic.subtitle}</p>
          <span className="text-border">·</span>
          <p className="text-xs tracking-widest uppercase text-stone/60">
            {String(currentIndex + 1).padStart(2, "0")} / {String(topics.length).padStart(2, "0")}
          </p>
        </div>

        {/* Title */}
        <h1
          className={`font-serif text-4xl md:text-5xl font-light text-foreground leading-[1.15] mb-10 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {topic.title}
        </h1>

        {/* Definition block */}
        <div
          className={`border-l-2 border-${topic.color} pl-6 mb-14 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">Определение</p>
          <p className="text-foreground leading-[1.85] text-lg font-light">{topic.definition}</p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {topic.sections.map((section, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="font-serif text-2xl text-stone/30 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-2xl text-foreground font-light leading-tight">{section.heading}</h2>
              </div>

              <div className="ml-10">
                <p className="text-muted-foreground leading-[1.9] mb-4">{section.body}</p>
                {section.items && (
                  <ul className="space-y-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`mt-2 shrink-0 w-1 h-1 rounded-full bg-${topic.color}`} />
                        <span className="text-foreground/80 leading-[1.8] text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {i < topic.sections.length - 1 && (
                <div className="ml-10 mt-10 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Navigation between topics */}
      <nav className="border-t border-border px-6 lg:px-16 py-8">
        <div className="max-w-3xl flex items-center justify-between gap-4">
          {prev ? (
            <button
              onClick={() => navigate(`/topic/${prev.id}`)}
              className="group flex items-center gap-3 text-left min-w-0"
            >
              <Icon name="ArrowLeft" size={14} className="text-muted-foreground shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
              <div className="min-w-0">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-0.5">Назад</p>
                <p className="text-sm text-foreground truncate group-hover:text-sage transition-colors duration-300">{prev.title}</p>
              </div>
            </button>
          ) : <div />}

          <button
            onClick={() => navigate("/")}
            className="shrink-0 w-8 h-8 flex items-center justify-center border border-border hover:border-sage hover:text-sage text-muted-foreground transition-all duration-300"
          >
            <Icon name="Grid2x2" size={14} />
          </button>

          {next ? (
            <button
              onClick={() => navigate(`/topic/${next.id}`)}
              className="group flex items-center gap-3 text-right min-w-0"
            >
              <div className="min-w-0">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-0.5">Далее</p>
                <p className="text-sm text-foreground truncate group-hover:text-sage transition-colors duration-300">{next.title}</p>
              </div>
              <Icon name="ArrowRight" size={14} className="text-muted-foreground shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : <div />}
        </div>
      </nav>
    </div>
  )
}
