import { useState } from 'react'
import Text from './text'

interface Props {
  title: string
  onSelect: (value: string) => void
}

const Input: React.FC<Props> = ({title, onSelect}) => {
  const [search, setSearch] = useState<string>('')

  return (
    <div className='flex flex-col gap-1.5'>
      <Text variant="h5" className="text-onPrimaryContainer text-xs leading-4">
        {title}:
      </Text>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          onSelect(e.target.value)
        }}
        className={`bg-white flex items-center justify-between text-sm leading-5 w-full md:w-20 p-3 rounded-2xl border-2 border-outlineVar hover:border-surfaceTint focus:outline-surfaceTint focus:ring-0 text-onSurfaceVar caret-onSurfaceVar`}
        placeholder='Ejm. 36'
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default Input
