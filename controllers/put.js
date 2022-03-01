const data = require('../database/data.js');
const moment = require('moment');

module.exports = {
  spentPoints: (req, res) => {
    const { member_id } = req.params;
    let { points } = req.body;

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
      unusedPoints.sort((a,b) => {
        let aTimestamp = '';
        let bTimestamp = '';
        for (let i = 0; i < a.timestamp.length; i++) {
          if (a.timestamp[i] !== '-' && a.timestamp[i] !== 'T' && a.timestamp[i] !== ':' && a.timestamp[i] !== 'Z') {
            aTimestamp += ('' + a.timestamp[i]);
            bTimestamp += ('' + b.timestamp[i]);
          }
        }
        return aTimestamp - bTimestamp;
      });

      for (let i = 0; i < unusedPoints.length; i++) {
        let currentPoint = unusedPoints[i].currentPoints;
        let currentPayer = unusedPoints[i].payer;

        if (points > currentPoint) {

          if (pointSpent.hasOwnProperty(currentPayer)) {
            pointSpent[currentPayer] += -currentPoint;
          } else {
            pointSpent[currentPayer] = -currentPoint;
          }

          unusedPoints[i].currentPoints = 0;
          let moveToSpent = unusedPoints.shift();
          i--;

          points = points - currentPoint;
          memberData.spentPoints.push(moveToSpent);
        } else {
          let pointLeft = currentPoint - points;

          if (pointSpent.hasOwnProperty(currentPayer)) {
            pointSpent[currentPayer] += -points;
          } else {
            pointSpent[currentPayer] = -points;
          }

          unusedPoints[i].currentPoints = pointLeft;

          if (pointLeft === 0) {
            let moveToSpent = unusedPoints.shift();
            memberData.spentPoints.push(moveToSpent);
          }

          break;

        }
      }

      let spentPoints = [];

      for (let spent in pointSpent) {
        let obj = {
          "payer": spent,
          "points": pointSpent[spent]
        }
        spentPoints.push(obj);
      }

      let updateAllPoints = memberData.pointsPerPayer;

      for (let spentData of spentPoints) {
        let num = updateAllPoints[spentData.payer];
        let num2 = pointSpent[spentData.payer];
        updateAllPoints[spentData.payer] = num + num2;
      }

      res.status(200).json(spentPoints);
    }
  }
}
