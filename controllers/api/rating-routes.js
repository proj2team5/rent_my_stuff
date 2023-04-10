const router = require('express').Router();
const { Rating } = require('../../models');

// this module holds all the api routes related to the loan object
// ratings are anonymous and no data about the rater is stored
// this means that ratings can only be deleted by site admin and not through API so no DELETE or update route is offered


// crate new rating
router.post('/', async (req, res) => {
  try {
    const newRating = await Rating.create(req.body);
    res.status(200).json(newRating);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;