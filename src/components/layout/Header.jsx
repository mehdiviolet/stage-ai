import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

/**
 * Header Component - Barra superiore dell'applicazione
 *
 * @param {Function} onMenuClick - Callback per aprire/chiudere la sidebar (mobile)
 * @param {Boolean} darkMode - Stato tema corrente (opzionale, per ora non usato)
 * @param {Function} onThemeToggle - Callback per cambiare tema (opzionale, per ora non usato)
 */
export function Header({ onMenuClick, darkMode = false, onThemeToggle }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {/* Menu Icon - Visibile solo su mobile/tablet */}
        <Tooltip title="Menu">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{
              mr: 2,
              display: { md: "none" }, // Nascosto su desktop (>900px)
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        {/* Titolo App */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 0,
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          AI Platform
        </Typography>

        {/* Spacer - Spinge gli elementi successivi a destra */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Toggle Tema - Opzionale per ora */}
        <Tooltip title={darkMode ? "Modalità chiara" : "Modalità scura"}>
          <IconButton color="inherit" onClick={onThemeToggle} sx={{ ml: 1 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>

        {/* Puoi aggiungere altri elementi qui, es: Avatar utente */}
        {/* 
        <Tooltip title="Profilo">
          <IconButton color="inherit" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>
        </Tooltip>
        */}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
  onThemeToggle: PropTypes.func,
};

Header.defaultProps = {
  darkMode: false,
  onThemeToggle: () => console.log("Theme toggle not implemented yet"),
};
