import { useNavigate } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  path: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const navigate = useNavigate()

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-24 pt-4">
      <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 overflow-x-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 flex-shrink-0">
            {idx === items.length - 1 ? (
              <span className="text-black font-medium">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => navigate(item.path)}
                className="hover:text-black transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            )}
            {idx < items.length - 1 && (
              <img src="/divider.svg" alt="divider" className="w-3 h-3 md:w-4 md:h-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}