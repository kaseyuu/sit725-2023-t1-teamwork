require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hruudlw.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

//DB connection for item upload

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.hruudlw.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);

  });

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
});

// Define the Item model
const Item = mongoose.model('Item', itemSchema);

// Set up routes
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Create an item
app.post('/items', upload.single('image'), (req, res) => {
  const { name, category, subcategory, condition, price, size, location } = req.body;
  const image = req.file.filename;

  const item = new Item({
    name,
    category,
    subcategory,
    condition,
    price,
    size,
    location,
    image,
  });
  item
    .save()
    .then(() => {
      console.log('Item saved to the database');
      res.redirect('/success.html');
    })
    .catch((error) => {
      console.error('Error saving item to the database:', error);
      res.redirect('/error.html');
    });
    

});

// Read a specific item
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  Item.findById(itemId)
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch((error) => {
      console.error('Error fetching item from the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
// Read a specific item
app.get('/item/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view.html'));
});


// Read all items
app.get('/items', (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      console.error('Error fetching items from the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Update an item
app.put('/items/:id', upload.single('image'), (req, res) => {
  const itemId = req.params.id;
  const { name, category, subcategory, condition, price, size, location } = req.body;

  // Check if a new image file was uploaded
  const image = req.file ? req.file.filename : undefined;

  Item.findByIdAndUpdate(
    itemId,
    { name, category, subcategory, condition, price, size, location, image },
    { new: true }
  )
    .then((item) => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch((error) => {
      console.error('Error updating item in the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;

  Item.findByIdAndRemove(itemId)
    .then((item) => {
      if (item) {
        // Delete the image file
        const imagePath = path.join(__dirname, 'uploads', item.image);
        fs.unlink(imagePath, (error) => {
          if (error) {
            console.error('Error deleting image file:', error);
          } else {
            console.log('Image file deleted successfully');
          }
        });

        res.json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch((error) => {
      console.error('Error deleting item from the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});




// Route for edit.html
app.get('/edit/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'edit.html'));
});

//Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



//USER ACCOUNTS DATABASE

//const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@userdb.a9xelkj.mongodb.net/?retryWrites=true&w=majority", {

}).then(() => {
    console.log("DB Connection Success");
}).catch((e) => {
    console.log("DB Connection Failed");
})
    
module.exports = client;




