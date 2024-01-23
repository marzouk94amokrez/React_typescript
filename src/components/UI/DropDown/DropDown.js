import { useEffect, useRef, useState } from 'react'
import './DropDown.css';

function DropDown({ icon, zIndex, closeModal, children }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const divRef = useRef();
  //console.log(closeModal)
  const clickOutSideHandler = e => {
    if (divRef.current.contains(e.target)) {
      // inside the div
      return
    }
    // outside click
    setShowDropdown(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickOutSideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutSideHandler);
    }
  }, [])

  return (
    <div ref={divRef} className="UIdropDown__container" style={{ zIndex: zIndex }}>
      <div className="UIdropDown__icon" onClick={() => setShowDropdown(!showDropdown)}>
        {icon}
      </div>

      <div className="UidropDown__content" style={{ display: showDropdown ? "flex" : "none" }}>
        {children}
      </div>
    </div>
  )
}

export default DropDown
