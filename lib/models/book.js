const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();


const unwindAuthor = {
  $unwind: {
    path: '$authors'
  }
};

const groupAuthors = {
  $group: {
    _id: '$authors',
    pageCout: {
      $avg: '$pageCount'
    }
  }
};

schema.static('books', function() {
  const pipeline = [
    unwindAuthor,
    groupAuthors
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Books', schema);