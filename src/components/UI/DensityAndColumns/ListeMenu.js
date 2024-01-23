import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";
import { LabelDensityAndColumns } from "../TablePagination/TablePagination.styled";
import {
  PrimaryBtnOutlineAction,
  SecondaryBtnOutlineAction,
  DensityBtnOutlineAction,
} from "@/styles/Common";

export default function ListeMenu({ setDensity }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (a) => {
    setDensity(a);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <DensityBtnOutlineAction
          onClick={handleClick}
          size="small"
          sx={{ ml: 3 }}
        >
          <DensitySmallIcon fontSize="small" />
          <LabelDensityAndColumns>Densité</LabelDensityAndColumns>
        </DensityBtnOutlineAction>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.32))",
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleMenuItemClick("1rem")}>
          <ListItemIcon>
            <DensitySmallIcon style={{ color: "#809FB8" }} fontSize="small" />
          </ListItemIcon>
          <LabelDensityAndColumns style={{ color: "#505050 !important" }}>
            {" "}
            Compact
          </LabelDensityAndColumns>
        </MenuItem>

        <MenuItem onClick={() => handleMenuItemClick("2.25rem")}>
          <ListItemIcon>
            <DensityMediumIcon fontSize="small" style={{ color: "#809FB8" }} />
          </ListItemIcon>
          <LabelDensityAndColumns style={{ color: "#505050 !important" }}>
            {" "}
            Standard
          </LabelDensityAndColumns>
        </MenuItem>

        <MenuItem onClick={() => handleMenuItemClick("3.3rem")}>
          <ListItemIcon>
            <DensityLargeIcon fontSize="small" style={{ color: "#809FB8" }} />
          </ListItemIcon>
          <LabelDensityAndColumns style={{ color: "#505050 !important" }}>
            {" "}
            Confortable
          </LabelDensityAndColumns>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
