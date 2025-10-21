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
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Sidebar Component - Menu laterale dell'applicazione
 *
 * @param {Boolean} open - Stato aperto/chiuso (per mobile)
 * @param {Function} onClose - Callback per chiudere sidebar (mobile)
 * @param {Array} sessions - Lista sessioni chat (per ora array vuoto)
 */

const DRAWER_WIDTH = 240;

export function Sidebar({ open, onClose, sessions = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

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
    console.log("🆕 Nuova chat creata (funzione da implementare in Fase 5)");
    navigate("/");
    if (onClose) {
      onClose();
    }
  };

  // Menu items di navigazione
  const menuItems = [
    { text: "Chat", icon: <ChatIcon />, path: "/" },
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
          SESSIONI
        </Typography>

        {sessions.length === 0 ? (
          // Empty state
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Nessuna sessione
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Clicca "Nuova Chat" per iniziare
            </Typography>
          </Box>
        ) : (
          // Lista sessioni (verrà popolata nella Fase 5)
          <List dense>
            {sessions.map((session) => (
              <ListItem key={session.id} disablePadding>
                <ListItemButton
                  selected={session.active}
                  onClick={() => console.log("Session clicked:", session.id)}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <ChatIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={session.title}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      noWrap: true,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
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
          keepMounted: true, // Migliore performance su mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
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
          display: { xs: "none", sm: "block" },
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
  open: PropTypes.bool,
  onClose: PropTypes.func,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ),
};

Sidebar.defaultProps = {
  open: false,
  onClose: () => {},
  sessions: [],
};
