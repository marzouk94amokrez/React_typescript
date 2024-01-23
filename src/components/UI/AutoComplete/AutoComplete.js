import { useEffect, useRef, useState } from 'react'
import { ACContainer, ACInput, ACItem, ACList } from './AutoComplete.styled'

function AutoComplete({ name, value, onChange, suggestions, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef();

  const clickOutSideHandler = e => {
    if (divRef.current.contains(e.target)) {
      // inside the div
      return
    }
    // outside click
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickOutSideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutSideHandler);
    }
  }, [])

  useEffect(() => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [suggestions])


  return (
    <ACContainer ref={divRef}>
      <ACInput
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {
        isOpen && (
          <ACList>
            {
              suggestions.map(suggestion => {
                return (
                  <ACItem
                    key={suggestion?.value}
                    onClick={() => onSelect(suggestion?.value)}
                  >
                    {suggestion?.value}
                  </ACItem>
                )
              })
            }
          </ACList>
        )
      }
    </ACContainer>
  )
}

export default AutoComplete
