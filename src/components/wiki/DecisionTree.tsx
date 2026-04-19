import { useState } from "react"
import type { TreeNode } from "@/data/wiki"
import Icon from "@/components/ui/icon"

interface DecisionTreeProps {
  nodes: TreeNode[]
  selectedId: string | null
  onSelect: (id: string) => void
}

interface TreeItemProps {
  node: TreeNode
  selectedId: string | null
  onSelect: (id: string) => void
  depth?: number
}

function TreeItem({ node, selectedId, onSelect, depth = 0 }: TreeItemProps) {
  const hasChildren = node.children && node.children.length > 0
  const isLeaf = !hasChildren

  const isSelected = selectedId === node.id
  const hasSelectedDescendant = (n: TreeNode): boolean => {
    if (n.id === selectedId) return true
    return (n.children || []).some(hasSelectedDescendant)
  }
  const [isOpen, setIsOpen] = useState(() => hasSelectedDescendant(node))

  const handleClick = () => {
    if (isLeaf) {
      onSelect(node.id)
    } else {
      setIsOpen((v) => !v)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-2 py-1.5 px-2 text-left transition-all duration-300 group
          ${depth === 0 ? "text-xs tracking-[0.2em] uppercase font-medium" : "text-sm"}
          ${isSelected
            ? "text-sage"
            : "text-muted-foreground hover:text-foreground"
          }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          <span className="shrink-0 transition-transform duration-300" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
            <Icon name="ChevronRight" size={12} />
          </span>
        ) : (
          <span className="shrink-0 w-3 h-3 flex items-center justify-center">
            <span className={`block w-1 h-1 rounded-full transition-colors duration-300 ${isSelected ? "bg-sage" : "bg-stone group-hover:bg-foreground"}`} />
          </span>
        )}
        <span className="truncate">{node.label}</span>
      </button>

      {hasChildren && (
        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: isOpen ? "1000px" : "0px" }}
        >
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function DecisionTree({ nodes, selectedId, onSelect }: DecisionTreeProps) {
  return (
    <nav className="space-y-1">
      {nodes.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </nav>
  )
}
