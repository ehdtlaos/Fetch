const data = require('../database/data.js');

module.exports = {
  //return current points per payer
  getCurrentPoints: (req, res) => {
    const { member_id } = req.params;

    if (!data.hasOwnProperty(member_id)) {
      res.status(401).json('member does not exist')
    } else {
      const currentPoints = data[member_id].pointsPerPayer;
      //res.status(200).json(currentPoints);
      res.status(200).json(data);
    }
  }
}
