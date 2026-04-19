import { useState, useMemo } from "react"
import { wikiTree, articles } from "@/data/wiki"
import { DecisionTree } from "@/components/wiki/DecisionTree"
import { ArticleView } from "@/components/wiki/ArticleView"
import Icon from "@/components/ui/icon"

export default function Wiki() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const selectedArticle = selectedId ? (articles[selectedId] ?? null) : null

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return Object.values(articles).filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [search])

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setSearch("")
    setIsSidebarOpen(false)
  }

  const handleTagClick = (tag: string) => {
    setSearch(tag)
    setSelectedId(null)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="flex h-16 items-center gap-4 px-6 lg:px-10 max-w-[1600px] mx-auto">
          {/* Logo */}
          <a href="/" className="font-serif text-xl tracking-wide text-foreground shrink-0">
            Wabi
          </a>

          <div className="w-px h-5 bg-border mx-2 hidden md:block" />

          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground hidden md:block shrink-0">
            База знаний
          </span>

          {/* Search */}
          <div className="relative flex-1 max-w-lg ml-auto">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по базе знаний..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-sand/50 border border-transparent focus:border-sage focus:bg-background focus:outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/60"
            />

            {/* Search dropdown */}
            {search && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border shadow-lg z-50 max-h-72 overflow-y-auto">
                {searchResults.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleSelect(article.id)}
                    className="w-full text-left px-4 py-3 hover:bg-sand/60 transition-colors border-b border-border last:border-0"
                  >
                    <p className="text-sm text-foreground font-medium">{article.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{article.excerpt}</p>
                  </button>
                ))}
              </div>
            )}
            {search && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border shadow-lg z-50 px-4 py-3">
                <p className="text-sm text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </div>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden ml-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Открыть навигацию"
          >
            <Icon name={isSidebarOpen ? "X" : "Menu"} size={18} />
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 pt-16 max-w-[1600px] mx-auto w-full">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 border-r border-border bg-background overflow-y-auto z-40 transition-transform duration-500 lg:translate-x-0 shrink-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-6">
            {/* Sidebar header */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.3em] uppercase text-terracotta mb-1">Навигация</p>
              <p className="font-serif text-lg text-foreground font-light">Дерево тем</p>
            </div>

            {/* Tree */}
            <DecisionTree
              nodes={wikiTree}
              selectedId={selectedId}
              onSelect={handleSelect}
            />

            {/* Footer hint */}
            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                Выберите раздел, чтобы раскрыть подтемы
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Article area */}
        <main className="flex-1 min-w-0 px-6 lg:px-16 xl:px-24 py-16">
          <ArticleView article={selectedArticle} onTagClick={handleTagClick} />
        </main>

        {/* Right TOC / Stats panel (desktop only) */}
        <aside className="hidden xl:block w-60 shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-l border-border overflow-y-auto">
          <div className="p-6">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">В базе знаний</p>
            <div className="space-y-4">
              <div>
                <p className="font-serif text-3xl text-sage">{Object.keys(articles).length}</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Статей</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-sage">{wikiTree.length}</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Разделов</p>
              </div>
            </div>

            {selectedArticle && (
              <div className="mt-10 pt-6 border-t border-border">
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">Теги статьи</p>
                <div className="flex flex-col gap-2">
                  {selectedArticle.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-sage transition-colors text-left"
                    >
                      <Icon name="Hash" size={10} />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
