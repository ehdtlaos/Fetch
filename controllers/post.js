const data = require('../database/data.js');

module.exports = {
  //add or create new member data using point, payer and timestamp information
  addNewPoints: (req, res) => {
    const { member_id } = req.params;
    const { payer, points, timestamp } = req.body;

    //set up object for new payer and point information
    const transaction = {
      "payer": `${payer}`,
      "earnedPoints": points,
      "timestamp": `${timestamp}`,
      "currentPoints": points
    }

    //if we don't have member's information
    if (!data.hasOwnProperty(member_id)) {

      //check to see if points are positive. We don't want negative point balance on account
      if (points >= 0) {
        //if points are positive, we set up new member's information in the system
        data[member_id] = {
          allPoints: [transaction],
          spentPoints: [],
          pointsPerPayer: {
            [payer]: points
          },
        };

        //return status 200
        res.status(200);

        //testing return to see whole data as a return
        //res.status(200).json(data);
      } else {
        //if point was negative, we return error messaging saying member can't have negative balance
        res.status(401).json('error: points cannot go negative');
      }

    } else {
      //if we have member's information already
      let transactions = data[member_id];

      //we need to check if payer's info already exist or if it is a new payer
      if (transactions.pointsPerPayer[payer]) {
        //if payer info exist in the system already, we need to check if total balance is going to be negative or positive
        let negativeTest = transactions.pointsPerPayer[payer] + points
        //if total points become positive
        if (negativeTest >= 0) {
          //update points
          transactions.pointsPerPayer[payer] += points;
          transactions.allPoints.push(transaction);

          res.status(200);
          //testing return where it returns whole data
          //res.status(200).json(data);
        } else {
          //if total points go negative, return error message saying points can't go negative
          res.status(401).json('error: points cannot go negative');
        }
      } else {
        //if payer's information is new payer's information
        if (points >= 0) {
          //add payer's information to both allPoints and pointsPerPayer
          transactions.allPoints.push(transaction);
          transactions.pointsPerPayer[payer] = points;

          res.status(200);

          //testing return where it returns whole data
          //res.status(200).json(data);
        } else {
          //if given point is negative, return error message saying points can't go negative
          res.status(401).json('error: points cannot go negative');
        }
      }
    }
  }
}