import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SelectWrap, SelectContainer, SelectValue, SelectIcon, SelectOptions } from './DeepSelect.styled';
import { useEffect } from 'react';
import "./DeepSelect.css"

function DeepSelect({ value, onChange, options, width, close, deleteItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [PL, setPL] = useState()
  const [PC, setPC] = useState()
  const [PF, setPF] = useState()
  useEffect(() => {
    setPF(options.filter(item => item.family == "PF"))
    setPC(options.filter(item => item.family == "PC"))
    setPL(options.filter(item => item.family == "PL"))
  }, [options])

  const handleClick = (newValue) => {
    setIsOpen(false)
    onChange(newValue)
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
            <div>
              <p style={{ fontStyle: 'italic' }} className="selectionTitle">Preuves de facturation</p>
              <div className='selectionTitleContainer'>
                {
                  PF?.map((opt, index) => {
                    return <p className={value == opt.label ? "activeFile" : ""} onClick={() => handleClick(opt.value)}>{opt.label.replace(".pdf", "")} </p>
                  })
                }
              </div>
            </div>
            <div>
              <p style={{ fontStyle: 'italic' }} className="selectionTitle">Preuves de commande</p>
              <div className='selectionTitleContainer'>
                {
                  PC?.map((opt, index) => {
                    return <p className={value == opt.label ? "activeFile" : ""} onClick={() => handleClick(opt.value)}>{opt.label.replace(".pdf", "")} </p>
                  })
                }
              </div>
            </div>
            <div>
              <p style={{ fontStyle: 'italic' }} className="selectionTitle">Preuves de livraison</p>
              <div className='selectionTitleContainer'>
                {
                  PL?.map((opt, index) => {
                    return <p className={value == opt.label ? "activeFile" : ""} onClick={() => handleClick(opt.value)}>{opt.label.replace(".pdf", "")} </p>
                  })
                }
              </div>
            </div>
          </SelectOptions>
        )
      }
    </SelectWrap>
  );
}

export default DeepSelect;
