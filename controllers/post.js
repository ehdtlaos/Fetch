const data = require('../database/data.js');

module.exports = {
  //create new data using earned points
  addNewPoints: (req, res) => {
    const { member_id } = req.params;
    const { payer, points, timestamp } = req.body;

    const transaction = {
      "payer": `${payer}`,
      "earnedPoints": points,
      "timestamp": `${timestamp}`,
      "currentPoints": points
    }

    if (!data.hasOwnProperty(member_id)) {

      if (points >= 0) {
        data[member_id] = {
          allPoints: [transaction],
          spentPoints: [],
          pointsPerPayer: {
            [payer]: points
          },
        };

        res.status(200).json(data);
      } else {
        res.status(401).json('error: points cannot go negative');
      }

    } else {
      let transactions = data[member_id];

      if (transactions.pointsPerPayer[payer]) {
        let negativeTest = transactions.pointsPerPayer[payer] + points
        if (negativeTest >= 0) {
          transactions.pointsPerPayer[payer] += points;
          transactions.allPoints.push(transaction);
          res.status(200).json(data);
        } else {
          res.status(401).json('error: points cannot go negative');
        }
      } else {
        if (points >= 0) {
          transactions.allPoints.push(transaction);
          transactions.pointsPerPayer[payer] = points;
          res.status(200).json(data);
        } else {
          res.status(401).json('error: points cannot go negative');
        }
      }
    }
  }
}