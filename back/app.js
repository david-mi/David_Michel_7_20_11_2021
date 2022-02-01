const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const userRoutes = require('./routes/User');
const messageRoutes = require('./routes/Message');
const likesRoutes = require('./routes/Likes');

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/messages', likesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//! SUPERADMIN POUR FACILITER LES TESTS

const superAdminRoutes = require('./routes/SuperAdmin');
app.use('/api/superadmin', superAdminRoutes);

module.exports = app;
