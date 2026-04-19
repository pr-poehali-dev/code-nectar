import { useEffect, useRef, useState } from "react"
import type { Article } from "@/data/wiki"
import Icon from "@/components/ui/icon"

interface ArticleViewProps {
  article: Article | null
  onTagClick: (tag: string) => void
}

export function ArticleView({ article, onTagClick }: ArticleViewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [article?.id])

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-8">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone to-transparent mb-10" />
        <p className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">База знаний</p>
        <p className="text-muted-foreground max-w-xs leading-relaxed text-sm">
          Выберите тему в навигации слева, чтобы начать читать
        </p>
      </div>
    )
  }

  const paragraphs = article.content.split("\n\n").filter(Boolean)

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      ref={ref}
    >
      {/* Category breadcrumb */}
      <p className="text-xs tracking-[0.25em] uppercase text-terracotta mb-6">
        {article.category}
      </p>

      {/* Title */}
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] mb-6">
        {article.title}
      </h1>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-border" />
        <span className="text-stone text-xs tracking-widest uppercase">статья</span>
        <div className="h-px w-8 bg-border" />
      </div>

      {/* Excerpt */}
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 font-light">
        {article.excerpt}
      </p>

      {/* Content */}
      <div className="space-y-6">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-foreground/80 leading-[1.9] text-base">
            {para}
          </p>
        ))}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Теги</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase text-muted-foreground border border-border hover:border-sage hover:text-sage transition-all duration-300"
              >
                <Icon name="Hash" size={10} />
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
