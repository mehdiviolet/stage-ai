import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";

export function HistoryPage() {
  // Mock data per preview
  const mockHistory = [
    {
      id: "1",
      title: "Conversazione su React",
      date: "20/10/2025",
      messages: 15,
    },
    {
      id: "2",
      title: "Domande su Material UI",
      date: "19/10/2025",
      messages: 8,
    },
    {
      id: "3",
      title: "Redux Toolkit tutorial",
      date: "18/10/2025",
      messages: 23,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          📜 Storico Conversazioni
        </Typography>

        <Typography variant="body1" paragraph>
          Qui potrai visualizzare tutte le tue conversazioni passate.
        </Typography>

        <Box sx={{ bgcolor: "info.light", p: 2, borderRadius: 1, mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            📋 Da implementare nella Fase 6:
          </Typography>
          <ul style={{ margin: 0 }}>
            <li>Lista completa conversazioni</li>
            <li>Ricerca/filtro per keyword</li>
            <li>Ordinamento per data</li>
            <li>Click per aprire conversazione</li>
            <li>Eliminazione conversazioni</li>
          </ul>
        </Box>
      </Paper>

      {/* Preview lista */}
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Preview Lista (mock data):
        </Typography>
        <List>
          {mockHistory.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                mb: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <ListItemText
                primary={item.title}
                secondary={`Data: ${item.date}`}
              />
              <Chip label={`${item.messages} messaggi`} size="small" />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
