const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const PORT = process.env.REACT_APP_BACKEND_PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://localhost:${process.env.PORT}`);
  next();
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'));
} else {
  app.get('/', ((req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  }));
}

// Add Error Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));