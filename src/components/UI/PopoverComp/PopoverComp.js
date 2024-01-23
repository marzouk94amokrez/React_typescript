import { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import "./PopoverComp.css"

function PopoverComp({ message }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <InfoIcon style={{ fontSize: "20px" }} aria-describedby={id} variant="contained" onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="documentsInfo" sx={{ p: 2 }}>{message}</div>
      </Popover>
    </>
  )
}

export default PopoverComp
