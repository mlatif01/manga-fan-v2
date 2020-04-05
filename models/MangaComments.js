const mongoose = require('mongoose');

const MangaComments = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comment: {
        type: String,
        required: true,
        min: 1,
        max: 255,
      },
      comment_date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('MangaComments', MangaComments);
