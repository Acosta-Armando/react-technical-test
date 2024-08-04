import { useState } from 'react'
import Text from './text'

interface Props {
  title: 'Anterior' | 'Siguiente'
  onCLick: () => void
  disabled?: boolean
}

const NavButton: React.FC<Props> = ({ title, onCLick, disabled }) => {
  const [onHover, setOnHover] = useState(false)

  const handleMouseOver = () => {
    setOnHover(true)
  }

  const handleMouseOut = () => {
    setOnHover(false)
  }

  return (
    <button
      className={`flex items-center p-3 gap-7 rounded-2xl ${title === 'Siguiente' ? 'flex-row-reverse pr-6' : 'flex-row pl-6'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryContainer text-onSurface hover:text-onPrimaryContainer'}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={disabled ? undefined : onCLick}
      disabled={disabled}
    >
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition fill-current ${title === 'Siguiente' ? '-rotate-90' : 'rotate-90'}`}
      >
        <path
          d="M6 7.69999L0 1.69999L1.4 0.299988L6 4.89999L10.6 0.299988L12 1.69999L6 7.69999Z"
          fill={!disabled && onHover ? "#21005d" : "#49454F"}
        />
      </svg>

      <Text variant="span" className="text-sm leading-5 ">
        {title}
      </Text>
    </button>
  )
}

export default NavButton
