const router = require('express').Router();
const { Gear } = require('../../models');
const upload = require('../../utils/upload');


router.post('/', upload.single('img_file'), async (req, res) => {
  console.log({...req.body})
  try {
    const newGear = await Gear.create({
      ...req.body,
      image_url: `/public/images/${req.file.fieldname}`,
      owner_id: 1,
    });
    res.status(200).json(newGear);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const gearData = await Gear.update(req.body,
      {
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!gearData) {
      res.status(404).json({ message: 'There is no camera gear matching this ID!' });
      return;
    }
    res.status(200).json(gearData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const gearData = await Gear.destroy({
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!gearData) {
      res.status(404).json({ message: 'There is no camera gear matching this ID!' });
      return;
    }
    res.status(200).json(gearData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;