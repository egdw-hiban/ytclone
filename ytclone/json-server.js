const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors())

app.use('/cheat-sheet1-pdf', express.static(__dirname + '/HIBAN.pdf'));
app.use('/cheat-sheet2-pdf', express.static(__dirname + '/safba-git.pdf'));
app.use('/article1-pdf', express.static(__dirname + '/hiban_article.pdf'));
app.use('/article2-pdf', express.static(__dirname + '/safba-article.pdf'));
app.use('/DocuTube-pdf', express.static(__dirname + '/ProductDisovery-DocuTube.pdf'));


//app.use('/title1', express.static(__dirname + '/HIBAN.pdf'));


// Route to get all users
app.get('/items', (req, res) => {
  // Read data from JSON file
  const data = require('./data.json');
  res.json(data);
});


// Route to get a specific user by ID
app.get('/items/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const data = require('./data.json');
  const item = data.items.find(user => user.id === userId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

// Route to add a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  const data = require('./data.json');
  data.users.push(newUser);
  // Update the JSON file with the new user
  // In a real application, you might want to use a database instead
  // For simplicity, we're just updating the JSON file directly
  // fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
  res.status(201).json(newUser);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});