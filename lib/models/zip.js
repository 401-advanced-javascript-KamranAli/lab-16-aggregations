const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const sortZip = {
  $sort: {
    pop: -1
  }
};

const projectZip = {
  $project: {
    state: '$state',
    pop: '$pop'
  }
};

const limit = {
  $limit: 10
};

schema.static('topTen', function() {
  const pipeline = [
    sortZip,
    projectZip,
    limit
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Zips', schema);

