const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    console.log('Assignments route hit!');  
  try {
    console.log('Fetching assignments from database...');
    const [rows] = await pool.query('SELECT * FROM assignments ORDER BY date DESC');
    console.log('Query result:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch assignments',
      error: error.message 
    });
  }
});


router.post('/', async (req, res) => {
  try {
    console.log('Received assignment data:', req.body); 
    
    const { assigned_to, department, date, location, description } = req.body;
    
  
    if (!assigned_to || !department || !date || !location) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    const [result] = await pool.query(
      `INSERT INTO assignments 
       (assigned_to, department, date, location, description, status)
       VALUES (?, ?, ?, ?, ?, 'Active')`,
      [assigned_to, department, date, location, description || null]
    );

  
    const [newAssignment] = await pool.query(
      'SELECT * FROM assignments WHERE id = ?',
      [result.insertId]
    );

    console.log('Created assignment:', newAssignment[0]); 
    res.status(201).json(newAssignment[0]);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create assignment',
      error: error.message 
    });
  }
});

module.exports = router;