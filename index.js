require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const config = require('./config.json');
const authRoutes = require('./routes/auth');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});
const app = express();

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  if (!req.user) return res.redirect('/');
  res.render('dashboard', { user: req.user });
});

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}!`);
});

client.login(config.token);

app.get('/', (req, res) => {
  res.render('login');  // Creates simple login page
});

app.listen(3000, () => {
  console.log('Web server running on http://localhost:3000');
});
