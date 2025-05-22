const mongoose = require('mongoose');

const ButtonSchema = new mongoose.Schema({
  id: String,
  icon: String,
  text: String,
  color: String,
  link: String
});

const SectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  buttons: [ButtonSchema]
});

const BottomNavSchema = new mongoose.Schema({
  id: String,
  icon: String,
  text: String,
  color: String,
  link: String,
  active: Boolean
});

const MoreSchema = new mongoose.Schema({
  id: String,
  icon: String,
  text: String,
  link: String
});

const MenuSchema = new mongoose.Schema({
  sections: [SectionSchema],
  bottomNav: [BottomNavSchema],
  more: [MoreSchema]
});

module.exports = mongoose.model('Menu', MenuSchema);
