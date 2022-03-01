const data = require('../database/data.js');
const moment = require('moment');

module.exports = {
  spentPoints: (req, res) => {
    const { member_id } = req.params;
    const { points } = req.body;

    let currentPoints = 0;
    let memberData = data[member_id];
    let validPoints = memberData.pointsPerPayer;
    let unusedPoints = memberData.allPoints;

    for (let payerName in validPoints) {
      currentPoints += validPoints[payerName];
    }

    if (currentPoints < points) {
      //if spent points are higher than current points, return error message 'not enough points'
      res.status(400).json('Not enough points');
    } else {
      let pointSpent = {};
      const timeStamp = moment().format();

      for (let currentPoint of unusedPoints) {
        let currentPoint = currentPoint.points;
        let currentPayer = currentPoint.payer;

        if (points > currentPoint) {
          
        }
      }
    }
  }
}
