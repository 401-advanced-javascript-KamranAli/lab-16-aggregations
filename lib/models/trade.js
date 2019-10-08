const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const matchTicker = {
  $match: {
    ticker: 'abcd'
  }
};

const projectTime = {
  $project: {
    shares: '$shares',
    hour: {
      '$hour': '$time'
    }
  }
};

const sortTopTen = {
  $sort: {
    shares: -1
  }
};

const sortBottomTen = {
  $sort: {
    shares: 1
  }
};

const limitTen = { $limit: 10 };

schema.static('tradeTop', function() {
  const pipeline = [
    matchTicker,
    projectTime,
    sortTopTen,
    limitTen
  ];

  return this.aggregate(pipeline);
});

schema.static('tradeBottom', function() {
  const pipeline2 = [
    matchTicker,
    projectTime,
    sortBottomTen,
    limitTen
  ];

  return this.aggregate(pipeline2);
});

module.exports = mongoose.model('Trade', schema);