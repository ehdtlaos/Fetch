const router = require('express').Router();
const controller = require('./controllers');

//get data from database
router.get(`/get/:member_id`, controller.get.getCurrentPoints);

//create data using earned points
router.post(`/add/:member_id`, controller.post.addNewPoints);

//update data using spent points
router.put(`/put/:member_id`, controller.post.spentPoints)

module.exports = router;