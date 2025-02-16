// components/CollectionTypeSelector.tsx
import { CollectionType } from '@/types'

interface CollectionTypeSelectorProps {
  selectedType: CollectionType
  onTypeSelect: (type: CollectionType) => void
}

export default function CollectionTypeSelector({
  selectedType,
  onTypeSelect
}: CollectionTypeSelectorProps) {
  const types: { id: CollectionType; label: string; icon: string }[] = [
    { id: 'GARBAGE', label: 'Garbage', icon: '🗑️' },
    { id: 'RECYCLING', label: 'Recycling', icon: '♻️' },
    { id: 'COMPOST', label: 'Compost', icon: '🌱' }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Collection Type</h2>
      <div className="space-y-2">
        {types.map(type => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`
              w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3
              ${selectedType === type.id 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'hover:bg-gray-50 text-gray-700'}
            `}
          >
            <span className="text-xl">{type.icon}</span>
            <span className="font-medium">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}