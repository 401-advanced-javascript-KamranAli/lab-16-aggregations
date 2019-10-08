const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const unwindGrade = {
  $unwind: {
    path: '$scores'
  }
};

const matchForNull = {
  $match: {
    'scores.score': {
      $ne: null
    }
  }
};

const groupGrade = {
  $group: {
    _id: '$class_id',
    exam: {
      $avg: '$scores.score'
    },
    quiz: {
      $avg: '$scores.score'
    },
    homework: {
      $avg: '$scores.score'
    }
  }
};

schema.static('grade', function() {
  const pipeline = [
    unwindGrade,
    matchForNull,
    groupGrade
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Grade', schema);