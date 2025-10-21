import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";

export function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ color: "primary.main" }}
          >
            🔐 Login
          </Typography>

          <Typography
            variant="body1"
            paragraph
            align="center"
            color="text.secondary"
          >
            Pagina di autenticazione (placeholder)
          </Typography>

          {/* Form placeholder */}
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              disabled
              placeholder="user@example.com"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              disabled
              placeholder="********"
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              disabled
            >
              Accedi
            </Button>
          </Box>

          <Box sx={{ bgcolor: "warning.light", p: 2, borderRadius: 1, mt: 3 }}>
            <Typography variant="caption">
              ⚠️ Nota: L'autenticazione non è nei requisiti dello stage. Questa
              pagina è un placeholder opzionale.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
