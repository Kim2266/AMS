// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3003'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', cors());


app.use(express.json());


const assignmentsRouter = require('./routes/assignments');
const maintenanceRouter = require('./routes/maintenance');

app.use('/api/assignments', assignmentsRouter);
app.use('/api/maintenance', maintenanceRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});