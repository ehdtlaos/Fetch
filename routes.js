const router = require('express').Router();
const controller = require('./controllers');

//retrieve points per payers from database
router.get(`/get/:member_id`, controller.get.getCurrentPoints);

//create record of points using earned points
router.post(`/add/:member_id`, controller.post.addNewPoints);

//update point records of a member using spent points
router.put(`/spent/:member_id`, controller.put.spentPoints)

module.exports = router;