import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, Card, CardContent, Grid, Box, Pagination } from '@mui/material';

const Home = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
            {currentItems.map((item) => (
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


          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(items.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>


          <Box mt={4}>
            {selectedItem ? (
              <Card sx={{ bgcolor: 'primary.light', color: 'white', textAlign: 'left' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {selectedItem.title}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {selectedItem.body}
                  </Typography>
                </CardContent>
              </Card>
            ) : (

              <Typography variant="h6" color="text.primary">
                Select an item to view details
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
