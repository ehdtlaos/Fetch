const router = require('express').Router();
const controller = require('./controllers');

//create data using earned points
router.post(`/add/:member_id`, controller.post.addNewPoints);

module.exports = router;