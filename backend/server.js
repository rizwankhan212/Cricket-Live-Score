const express = require('express');
const cors = require('cors');
const path = require('path');
const scoreRoutes = require('./routes/scores');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Routes
app.use('/api', scoreRoutes);

// Serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
