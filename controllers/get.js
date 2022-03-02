const data = require('../database/data.js');

module.exports = {
  getCurrentPoints: (req, res) => {
    const { member_id } = req.params;

    //if member id doesn't exist, return 'member doesn't exist'
    if (!data.hasOwnProperty(member_id)) {
      res.status(401).json('member does not exist')
    } else {
      //if member id exist, grab total points per payer data and return it
      const currentPoints = data[member_id].pointsPerPayer;
      res.status(200).json(currentPoints);
    }
  }
}
