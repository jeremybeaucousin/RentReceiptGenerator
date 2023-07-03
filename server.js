const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// 👇️ serving static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// 👇️ catch-all route
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);