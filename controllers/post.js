const data = require('../database/data.js');
const moment = require('moment');

module.exports = {
  //create new data using earned points
  addNewPoints: (req, res) => {
    const { member_id } = req.params;
    const { payer, points } = req.body;
    const timeStamp = moment().format();

    const transaction = {
      "payer": `${payer}`,
      "points": `${points}`,
      "timestamp": `${timeStamp}`
    }

    if (!data.hasOwnProperty(member_id)) {
      data[member_id] = {
        allPoints: [transaction],
        spentPoints: {},
        pointsPerPayer: {
          [payer]: points
        },
      };
    } else {
      let transactions = data[member_id];
      transactions.allPoints.push(transaction);
      if (transactions.pointsPerPayer[payer]) {
        transactions.pointsPerPayer[payer] += points;
      } else {
        transactions.pointsPerPayer[payer] = points;
      }

    }

    res.status(201).json(data);
    console.log(data);
  }
}