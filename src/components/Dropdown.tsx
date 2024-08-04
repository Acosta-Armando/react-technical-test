import { useState } from 'react'
import Text from './text'
import ClickedOutside from './clickedOutside'
import arrow from '/public/icon-arrow.svg'
import flag from '/public/icon-flag.svg'
import { nationalities } from '../data/nationalities'

type NationalityKey = keyof typeof nationalities;

interface Props {
  options: string[]
  title: string
  type: 'results' | 'gender' | 'nat'
  onSelect: (value: string) => void
}

const Dropdown: React.FC<Props> = ({ options, title, type, onSelect }) => {
  const natDropdown = type === 'nat'
  const getWidth = type === 'results' ? ' w-full md:w-28' : 'w-full md:w-80'
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(options[0])
  const [search, setSearch] = useState<string>('')

  const sortedOptions = options;

  const filteredOptions = sortedOptions.filter((option) => {
    const label = natDropdown ? nationalities[option as NationalityKey] : option;
    return label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-1.5">
      <Text variant="h5" className="text-onPrimaryContainer text-xs leading-4 font-medium">
        {title}:
      </Text>
      <ClickedOutside onClickOutside={() => setIsOpen(false)}>
        <div className='relative'>
          <button
            className={`bg-white flex items-center justify-between p-3 pr-6 rounded-2xl border-2 hover:border-surfaceTint
              ${isOpen? 'border-surfaceTint' : 'border-outlineVar'} ${getWidth}`}
            onClick={() => setIsOpen((prev) =>!prev)}
          >
            <div className='flex gap-2.5'>
              {natDropdown && (
                <>
                  <img src={flag} alt='flag icon'/>
                  {isOpen &&
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full p-0 text-onSurfaceVar caret-onSurfaceVar text-sm leading-5 focus:outline-none focus:ring-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                </>
              )}
              <Text variant="span" className="text-onSurfaceVar text-sm leading-5">
                {natDropdown ? !isOpen && selected : selected}
              </Text>
            </div>
            <img src={arrow} alt="arrow" className={`${isOpen && 'rotate-180'}`} />
          </button>
          {isOpen && (
            <>
              <ul
                className={`bg-white absolute flex flex-col justify-center top-12 rounded-2xl z-50 ${getWidth}`}
                style={{
                  boxShadow: `0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);`
                }}
              >
                {filteredOptions.map((item, index) => (
                  <li
                    key={index}
                    className={`text-onSurfaceVar text-sm leading-5 p-3 hover:bg-surfContainerHigh cursor-pointer 
                      ${index === 0 && 'rounded-t-2xl'} ${index === filteredOptions.length - 1 && 'rounded-b-2xl'}`}
                    onClick={() => {
                      setSelected(type === 'nat'? nationalities[item as NationalityKey] : item)
                      setIsOpen(false)
                      setSearch('')
                      onSelect(type === 'nat'? nationalities[item as NationalityKey] : item)
                    }}
                  >
                    {natDropdown ? nationalities[item as NationalityKey] : item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </ClickedOutside>
    </div>
  )
}

export default Dropdown