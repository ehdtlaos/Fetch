const data = require('../database/data.js');

module.exports = {
  spentPoints: (req, res) => {
    const { member_id } = req.params;
    let { points } = req.body;

    let currentPoints = 0;
    let memberData = data[member_id];
    let validPoints = memberData.pointsPerPayer;
    let unusedPoints = memberData.allPoints;

    //iterate over the current points to check total points member has
    for (let payerName in validPoints) {
      currentPoints += validPoints[payerName];
    }

    if (currentPoints < points) {
      //if spent (input) points are higher than the total currentPoints, return error message 'not enough points'
      res.status(400).json('Not enough points');
    } else {
      //if we have enough points to spend

      //variable that is going to store information of how much points were deducted from which payer in this transaction
      let pointSpent = {};

      //sort list of unspent point information by the chronological order
      unusedPoints.sort((a,b) => {
        let aTimestamp = '';
        let bTimestamp = '';
        const isNumber = /^[0-9]+$/;
        for (let i = 0; i < a.timestamp.length; i++) {
          if (a.timestamp[i].match(isNumber)) {
            aTimestamp += ('' + a.timestamp[i]);
            bTimestamp += ('' + b.timestamp[i]);
          }
        }
        return aTimestamp - bTimestamp;
      });

      //iterate over the sorted list to spend points by the time order
      for (let i = 0; i < unusedPoints.length; i++) {
        let currentPoint = unusedPoints[i].currentPoints;
        let currentPayer = unusedPoints[i].payer;

        if (points > currentPoint) {
          //if given(input) point is higher than the current element's point, we are going to set this element's point to 0 and send it to spentPoint

          //if we already have information about this payer's point spent in result obj
          if (pointSpent.hasOwnProperty(currentPayer)) {
            //update spent amount
            pointSpent[currentPayer] += -currentPoint;
          } else {
            //add new payer's used point
            pointSpent[currentPayer] = -currentPoint;
          }

          //set current point to 0 and send whole element to the spentPoints
          unusedPoints[i].currentPoints = 0;
          let moveToSpent = unusedPoints.shift();
          i--;

          points = points - currentPoint;
          memberData.spentPoints.push(moveToSpent);
        } else {
          //if element's point is higher or equal to the remaining input points we are going to deduct the point and keep it in the allPoints
          let pointLeft = currentPoint - points;

          //update pointSpent obj
          if (pointSpent.hasOwnProperty(currentPayer)) {
            pointSpent[currentPayer] += -points;
          } else {
            pointSpent[currentPayer] = -points;
          }

          unusedPoints[i].currentPoints = pointLeft;

          //in case if point becomes 0, remove it and store it in spentPoints
          if (pointLeft === 0) {
            let moveToSpent = unusedPoints.shift();
            memberData.spentPoints.push(moveToSpent);
          }

          //break the loop
          break;

        }
      }

      //we need to convert poinSpent into an array
      let spentPoints = [];

      //iterate over pointSpent
      for (let spent in pointSpent) {
        //create each payer's spent information in obj
        let obj = {
          "payer": spent,
          "points": pointSpent[spent]
        }
        //then push it into the spentPoints array
        spentPoints.push(obj);
      }

      //we need to update pointsPerPay's information for this member after spending points
      let updateAllPoints = memberData.pointsPerPayer;

      //iterate over spentPoints to update information in pointsPerPayer
      for (let spentData of spentPoints) {
        let num = updateAllPoints[spentData.payer];
        let num2 = pointSpent[spentData.payer];
        updateAllPoints[spentData.payer] = num + num2;
      }

      //return spentPoints
      res.status(200).json(spentPoints);
    }
  }
}
