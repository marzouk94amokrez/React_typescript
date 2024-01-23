import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SPWrap, SPContainer, SelectValue, SelectIcon, SelectOptions, SelectOption } from './SelectPeriod.styled';

function SelectPeriod({ value, onChange, options }) {
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

  const handleClick = (newValue) => {
    setIsOpen(false);
    onChange(newValue);
  }

  return (
    <SPWrap ref={divRef}>
      <SPContainer onClick={() => setIsOpen(!isOpen)}>
        <SelectValue>
          {value}
        </SelectValue>
        <SelectIcon>
          {
            isOpen ? <KeyboardArrowUpIcon className="ICDBlue" />
              : <KeyboardArrowDownIcon className="ICDBlue" />
          }
        </SelectIcon>
      </SPContainer>
      {
        isOpen && (
          <SelectOptions>
            {
              options.map((item, index) => (
                <SelectOption
                  key={index}
                  onClick={() => handleClick(item.value)}
                >
                  {item.label}
                </SelectOption>
              )
              )}
          </SelectOptions>
        )
      }
    </SPWrap>
  );
}

export default SelectPeriod;
