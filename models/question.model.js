const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
 question: {
  type: String,
  required: true,
 },
 answer: {
  type: String,
  required: true,
 },
 options: {
  type: Array,
  required: true,
 },
 company: {
  type: Schema.Types.ObjectId,
  ref: 'Company',
  required: true,
 },
 certificate: {
  type: Schema.Types.ObjectId,
  ref: 'Certificate',
  required: true,
 },
 difficulty: {
  // options of easy medium or hard questions
  type: String,
  enum: ['easy', 'medium', 'hard'],
 },
 image: {
  type: String,
  default: "https://res.cloudinary.com/dcew0uqhb/image/upload/v1675523956/Arcade/appleLogo_ffdya1.png"
 },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

