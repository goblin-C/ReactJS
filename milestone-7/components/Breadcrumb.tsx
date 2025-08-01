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
    <div className="mx-[85px] px-4 pt-4">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, idx) => (
          <>
            {idx === items.length - 1 ? (
              <span key={idx} className="text-black">
                {item.label}
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className="hover:text-black transition-colors"
              >
                {item.label}
              </button>
            )}
            {idx < items.length - 1 && (
              <img src="/divider.svg" alt="divider" className="w-4 h-4" />
            )}
          </>
        ))}
      </div>
    </div>
  )
}