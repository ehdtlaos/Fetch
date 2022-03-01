const data = require('../database/data.js');

module.exports = {
  //return current points per payer
  getCurrentPoints: (req, res) => {
    const { member_id } = req.params;
    const currentPoints = data[member_id].pointsPerPayer;

    if (currentPoints) {
      res.status(200).json(currentPoints);
    } else {
      res.sendStatus(404);
    }
  }
}
