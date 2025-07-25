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

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      // Riprova dopo 2 secondi se non si connette
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to the MySQL database successfully');
    }
  });

  connection.on('error', err => {
    console.error('MySQL error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Reconnecting to the database...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// Routes

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
        c.name_en AS category_name_en,
        c.name_fr AS category_name_fr,
        c.is_active AS category_is_active,
        c.is_drink AS category_is_drink,
        d.id AS dish_id, 
        d.name AS dish_name, 
        d.name_en AS dish_name_en,
        d.name_fr AS dish_name_fr,
        d.image AS dish_image,
        d.description AS dish_description,
        d.description_en AS dish_description_en,
        d.description_fr AS dish_description_fr,
        d.price AS dish_price,
        d.is_active AS dish_is_active,
        dr.id AS drink_id, 
        dr.name AS drink_name,
        dr.price AS drink_price,
        dr.grape_variety AS drink_grape_variety,
        dr.producer AS drink_producer,
        dr.vintage AS drink_vintage,
        dr.is_active AS drink_is_active,
        dr.instructions AS drink_instructions,
        dr.description AS drink_description,
        dr.degrees AS drink_degrees,
        dr.origin AS drink_origin,
        dr.color AS drink_color,
        dr.production_method AS drink_production_method,
        dr.flavour AS drink_flavour,
        dr.denomination AS drink_denomination,
        dr.breeding_method AS drink_breeding_method,
        dr.format AS drink_format,
        dr.serving_temperature AS drink_serving_temperature,
        dr.nose AS drink_nose,
        dr.certifications AS drink_certifications,
        dr.image AS drink_image,
        dr.url AS drink_url
    FROM venues v
    LEFT JOIN category_venue cv ON v.id = cv.venue_id
    LEFT JOIN categories c ON cv.category_id = c.id
    LEFT JOIN dishes d ON c.id = d.category_id AND d.venue_id = v.id
    LEFT JOIN drinks dr ON c.id = dr.category_id AND dr.venue_id = v.id
    WHERE v.name = ?
    ORDER BY d.name ASC, dr.name ASC
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
          name_en: row.category_name_en,
          name_fr: row.category_name_fr,
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
          name_en: row.dish_name_en,
          name_fr: row.dish_name_fr,
          image: row.dish_image,
          description: row.dish_description,
          description_en: row.dish_description_en,
          description_fr: row.dish_description_fr,
          price: row.dish_price,
          is_active: row.dish_is_active
        });
      }
      if (row.drink_id) {
        formattedResults.categories[row.category_id].drinks.push({
          id: row.drink_id,
          name: row.drink_name,
          price: row.drink_price,
          grape_variety: row.drink_grape_variety,
          producer: row.drink_producer,
          vintage: row.drink_vintage,
          is_active: row.drink_is_active,
          instructions: row.drink_instructions,
          description: row.drink_description,
          degrees: row.drink_degrees,
          origin: row.drink_origin,
          color: row.drink_color,
          production_method: row.drink_production_method,
          flavour: row.drink_flavour,
          denomination: row.drink_denomination,
          breeding_method: row.drink_breeding_method,
          format: row.drink_format,
          serving_temperature: row.drink_serving_temperature,
          nose: row.drink_nose,
          certifications: row.drink_certifications,
          image: row.drink_image,
          url: row.drink_url
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

app.get('/api/drinks/allergens', (req, res) => {
  const query = `SELECT * FROM allergen_drink`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving drink allergens:', err);
      res.status(500).json({ error: 'Error retrieving drink allergens' });
      return;
    }

    res.json(results);
  });
});

app.get('/api/dishes/drinks/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT dd.dish_id, dd.drink_id, d.*
    FROM dish_drink dd
    JOIN drinks d ON dd.drink_id = d.id
    WHERE dd.dish_id = ?
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving drinks:', err);
      res.status(500).json({ error: 'Error retrieving drinks' });
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
