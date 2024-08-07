require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS and JSON parsing
app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_URL || '*',
};

// Serve static files from the Vue frontend app
app.use(express.static(path.join(__dirname, '..', 'frontend_menu_qr', 'dist')));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database successfully');
});

app.get('/api/venues', (req, res) => {
  const query = `SELECT name FROM venues`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving venues:', err);
      res.status(500).json({ error: 'Error retrieving venues' });
      return;
    }

    const venues = results.map(row => row.name);
    res.json(venues);
  });
});

app.get('/api/venues/:venue', (req, res) => {
  const venueName = req.params.venue;

  const query = `
    SELECT 
        v.name AS venue_name,
        c.id AS category_id, 
        c.name AS category_name, 
        c.is_active AS category_is_active,
        c.is_drink AS category_is_drink,
        d.id AS dish_id, 
        d.name AS dish_name, 
        d.image AS dish_image,
        d.description AS dish_description,
        d.price AS dish_price,
        d.is_active AS dish_is_active,
        dr.id AS drink_id, 
        dr.name AS drink_name
    FROM venues v
    LEFT JOIN category_venue cv ON v.id = cv.venue_id
    LEFT JOIN categories c ON cv.category_id = c.id
    LEFT JOIN dishes d ON c.id = d.category_id AND d.venue_id = v.id
    LEFT JOIN drinks dr ON c.id = dr.category_id AND dr.venue_id = v.id
    WHERE v.name = ?
  `;

  connection.query(query, [venueName], (err, results) => {
    if (err) {
      console.error('Error retrieving venue data:', err);
      res.status(500).json({ error: 'Error retrieving venue data' });
      return;
    }

    const formattedResults = {
      venue: venueName,
      categories: {}
    };

    results.forEach(row => {
      if (!formattedResults.categories[row.category_id]) {
        formattedResults.categories[row.category_id] = {
          id: row.category_id,
          name: row.category_name,
          is_active: row.category_is_active,
          is_drink: row.category_is_drink,
          dishes: [],
          drinks: []
        };
      }
      if (row.dish_id) {
        formattedResults.categories[row.category_id].dishes.push({
          id: row.dish_id,
          name: row.dish_name,
          image: row.dish_image,
          description: row.dish_description,
          price: row.dish_price,
          is_active: row.dish_is_active,
        });
      }
      if (row.drink_id) {
        formattedResults.categories[row.category_id].drinks.push({
          id: row.drink_id,
          name: row.drink_name
        });
      }
    });

    res.json(formattedResults);
  });
});

app.get('/api/allergens', (req, res) => {
  const query = `SELECT * FROM allergens`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving allergens:', err);
      res.status(500).json({ error: 'Error retrieving allergens' });
      return;
    }

    res.json(results);
  });
});


app.get('/api/dishes/allergens', (req, res) => {
  const query = `SELECT * FROM allergen_dish`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving dish allergens:', err);
      res.status(500).json({ error: 'Error retrieving dish allergens' });
      return;
    }

    res.json(results);
  });
});

// All other requests not handled by the API routes should serve the frontend app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend_menu_qr', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
