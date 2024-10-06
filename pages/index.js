import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, Card, CardContent, Grid, Box } from '@mui/material';

const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('/data.json')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Container>
      <Grid container spacing={5} justifyContent="center" alignItems="center" textAlign="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom sx={{ color: 'primary.main' }}>
          Test List
          </Typography>
          <List sx={{ borderRadius: 4 }}>
            {items.map((item) => (
              <ListItem
                button
                key={item.id}
                onClick={() => handleItemClick(item)}
                sx={{
                  '&:hover': { bgcolor: 'primary.light', color: 'white' },
                  color: 'primary.main'
                }}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
          <Box mt={4}>
            {selectedItem ? (
              <Card sx={{ bgcolor: 'primary.light', color: 'white', textAlign: 'left' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {selectedItem.title}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {selectedItem.description}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="h6" color="text.primary">
                Select an Test to view details
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
