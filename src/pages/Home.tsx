import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { topics } from "@/data/topics"
import Icon from "@/components/ui/icon"

export default function Home() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 lg:px-16 py-5 flex items-center justify-between">
        <p className="font-serif text-xl text-foreground tracking-wide">Профессиональная коммуникация</p>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground hidden sm:block">Учебный модуль</p>
      </header>

      {/* Hero */}
      <section className="px-6 lg:px-16 py-20 lg:py-28 max-w-4xl">
        <p
          className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          Тема занятия
        </p>
        <h1
          className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.15] mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Язык как средство профессиональной, социальной и межкультурной коммуникации
        </h1>
        <p
          className={`text-muted-foreground leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Выберите тему для изучения. Каждый раздел содержит определение, ключевые понятия и примеры из профессиональной практики.
        </p>
      </section>

      {/* Divider */}
      <div className="px-6 lg:px-16 mb-12">
        <div className="h-px bg-border max-w-6xl" />
      </div>

      {/* Topic Cards */}
      <section className="px-6 lg:px-16 pb-20 max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {topics.map((topic, i) => (
            <button
              key={topic.id}
              onClick={() => navigate(`/topic/${topic.id}`)}
              className={`group bg-background text-left p-8 lg:p-10 hover:bg-sand/60 transition-all duration-500 flex flex-col gap-5
                transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              {/* Icon */}
              <div className={`text-${topic.color} transition-transform duration-500 group-hover:scale-110 w-fit`}>
                <Icon name={topic.icon} size={28} strokeWidth={1} />
              </div>

              {/* Number */}
              <p className="font-serif text-5xl text-stone/30 group-hover:text-stone/50 transition-colors duration-500 -mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>

              {/* Text */}
              <div>
                <h2 className="font-serif text-xl text-foreground mb-1 leading-tight">{topic.title}</h2>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">{topic.subtitle}</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border text-muted-foreground group-hover:text-sage transition-colors duration-500">
                <span className="text-xs tracking-widest uppercase">Изучить</span>
                <Icon name="ArrowRight" size={12} className="transition-transform duration-500 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border px-6 lg:px-16 py-6 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Особенности профессиональной коммуникации</p>
        <p className="text-xs text-muted-foreground">{topics.length} тем</p>
      </footer>
    </div>
  )
}