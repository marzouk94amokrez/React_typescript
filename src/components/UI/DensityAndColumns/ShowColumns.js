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
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { LabelDensityAndColumns } from "../TablePagination/TablePagination.styled";
import {
  PrimaryBtnOutlineAction,
  SecondaryBtnOutlineAction,
  DensityBtnOutlineAction,
} from "@/styles/Common";
export default function ShowColumns({ columns, setColumns }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showAll, setShowAll] = React.useState(true);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (a, b, i) => {
    const filtersList = columns.filter((column) => column.field == a)[0];
    let v = { ...filtersList, show: b };
    let col = { ...columns, [i]: v };
    setColumns(Object.values(col));
    columns.some((row, index) => row.show === false && index != i)
      ? setShowAll(false)
      : setShowAll(true);
    if (b == false) {
      setShowAll(false);
    }
  };
  const handleMenuItemClickShowAll = () => {
    var b = columns.map(function (numbe) {
      return { ...numbe, show: true };
    });
    setColumns(b);
    setShowAll(true);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <DensityBtnOutlineAction
          border="#fff"
          onClick={handleClick}
          size="small"
          sx={{ ml: 4 }}
        >
          <ViewColumnIcon fontSize="small" />
          <LabelDensityAndColumns>Colonnes</LabelDensityAndColumns>
        </DensityBtnOutlineAction>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.32))",
            maxHeight: "300px",
            overflow: "auto",
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem
          key={"showAll123"}
          style={{ borderBottom: "1px solid #D9E1E7" }}
          onClick={() => handleMenuItemClickShowAll()}
        >
          <ListItemIcon>
            {showAll ? (
              <ToggleOnIcon
                style={{
                  marginLeft: "0.25rem",
                  color: "#00B8B8",
                  cursor: "pointer",
                }}
                fontSize="small"
                name="edi"
                onClick={() => handleMenuItemClickShowAll()}
              />
            ) : (
              <ToggleOffIcon
                style={{ marginLeft: "0.25rem", cursor: "pointer" }}
                fontSize="small"
                name="edi"
                onClick={() => handleMenuItemClickShowAll()}
              />
            )}
          </ListItemIcon>
          <LabelDensityAndColumns> Afficher tout </LabelDensityAndColumns>
        </MenuItem>

        {columns.map(
          (row, index) =>
            row.field != "docName" &&
            row.field != "name" &&
            row.field != "number" && (
              <MenuItem
                key={index}
                onClick={() =>
                  row.show
                    ? handleMenuItemClick(row.field, false, index)
                    : handleMenuItemClick(row.field, true, index)
                }
              >
                <ListItemIcon>
                  {row.show ? (
                    <ToggleOnIcon
                      style={{
                        marginLeft: "0.25rem",
                        color: "#00B8B8",
                        cursor: "pointer",
                      }}
                      fontSize="small"
                      name="edi"
                      onClick={() =>
                        handleMenuItemClick(row.field, false, index)
                      }
                    />
                  ) : (
                    <ToggleOffIcon
                      style={{ marginLeft: "0.25rem", cursor: "pointer" }}
                      fontSize="small"
                      name="edi"
                      onClick={() =>
                        handleMenuItemClick(row.field, true, index)
                      }
                    />
                  )}
                </ListItemIcon>
                <LabelDensityAndColumns>{row.title}</LabelDensityAndColumns>
              </MenuItem>
            )
        )}
      </Menu>
    </React.Fragment>
  );
}
