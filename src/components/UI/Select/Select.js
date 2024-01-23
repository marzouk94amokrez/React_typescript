import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SelectWrap, SelectContainer, SelectValue, SelectIcon, SelectOptions, SelectOption } from './Select.styled';
import CloseIcon from '@mui/icons-material/Close';
function Select({ value, onChange, options, width, close, deleteItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (newValue) => {
    setIsOpen(false);
    onChange(newValue);

  }

  return (
    <SelectWrap width={width}>
      <SelectContainer width={width} onClick={() => setIsOpen(!isOpen)}>
        <SelectValue>
          {value}
        </SelectValue>
        <SelectIcon>
          {
            isOpen ? <KeyboardArrowUpIcon className="ICDBlue" />
              : <KeyboardArrowDownIcon className="ICDBlue" />
          }
        </SelectIcon>
      </SelectContainer>
      {
        isOpen && (
          <SelectOptions width={width}>
            {
              options.map((item, index) => (
                <SelectOption
                  key={index}
                  onClick={() => handleClick(item.value)}
                >
                  {item.label}
                  {close && item?.attachement == true && <CloseIcon className="ICDBlue" onClick={e => { e.stopPropagation(); deleteItem(item) }} />}
                </SelectOption>
              )
              )}
          </SelectOptions>
        )
      }
    </SelectWrap>
  );
}

export default Select;
