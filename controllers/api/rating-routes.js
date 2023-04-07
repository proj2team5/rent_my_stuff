const router = require('express').Router();
const { Rating } = require('../../models');

router.post('/', async (req, res) => {

  try {
    const newRating = await Rating.create(req.body);
    res.status(200).json(newRating);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const ratingData = await Rating.update(req.body,
      {
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!ratingData) {
      res.status(404).json({ message: 'There is no camera gear matching this ID!' });
      return;
    }
    res.status(200).json(ratingData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;