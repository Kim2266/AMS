
const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM maintenance_logs ORDER BY date DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching maintenance logs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch maintenance logs',
      error: error.message 
    });
  }
});


router.post('/', async (req, res) => {
  const { date, performed_by, description, notes } = req.body;
  

  if (!date || !performed_by || !description) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields: date, performed_by, and description are required' 
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO maintenance_logs 
       (date, performed_by, description, notes)
       VALUES (?, ?, ?, ?)`,
      [date, performed_by, description, notes || null]
    );

   
    const [newLog] = await pool.query(
      'SELECT * FROM maintenance_logs WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newLog[0]);
  } catch (error) {
    console.error('Error creating maintenance log:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create maintenance log',
      error: error.message 
    });
  }
});

module.exports = router;