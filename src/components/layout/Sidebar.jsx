// src/components/layout/Sidebar.jsx
import PropTypes from "prop-types";
import {
  Drawer,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { createSession } from "../../features/sessions/sessionSlice";
import { createSession } from "../../features/sessions/sessionSlice";
// import SessionList from "../sessions/SessionList";
import SessionList from "../session/SessionList";

const DRAWER_WIDTH = 240;

export function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Handler per navigazione
  const handleNavigation = (path) => {
    navigate(path);
    // Chiudi drawer su mobile dopo click
    if (onClose) {
      onClose();
    }
  };

  // Handler nuova chat
  const handleNewChat = () => {
    dispatch(createSession());
    navigate("/");
    if (onClose) {
      onClose();
    }
  };

  // Menu items di navigazione
  const menuItems = [
    { text: "Chat", icon: <HomeIcon />, path: "/" },
    { text: "Storico", icon: <HistoryIcon />, path: "/history" },
    { text: "Impostazioni", icon: <SettingsIcon />, path: "/settings" },
  ];

  // Contenuto drawer (condiviso tra mobile e desktop)
  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Toolbar spacer per allineare con header */}
      <Toolbar />

      {/* Bottone Nuova Chat */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={handleNewChat}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Nuova Chat
        </Button>
      </Box>

      <Divider />

      {/* Lista Sessioni */}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            display: "block",
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          CONVERSAZIONI
        </Typography>

        <SessionList onSessionClick={onClose} />
      </Box>

      <Divider />

      {/* Menu Navigazione */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
    >
      {/* Drawer Mobile - Temporary */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer Desktop - Permanent */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
