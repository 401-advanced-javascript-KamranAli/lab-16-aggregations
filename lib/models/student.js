const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const unwindStudents = {
  $unwind: {
    path: '$scores'
  }
};

const matchStudentsForNull = {
  $match: {
    'scores.score': {
      $ne: null
    }
  }
};

const groupStudents = {
  $group: {
    _id: '$scores.type',
    min: {
      $min: '$scores.score'
    },
    avg: {
      $avg: '$scores.score'
    },
    max: {
      $max: '$scores.score'
    }
  }
};

schema.static('grades', function() {
  const pipeline = [
    unwindStudents,
    matchStudentsForNull,
    groupStudents
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Student', schema);