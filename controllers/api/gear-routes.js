const router = require('express').Router();
const { Gear } = require('../../models');
const upload = require('../../utils/upload');


router.post('/', upload.single('img_file'), async (req, res) => {
  console.log({...req.body})
  try {
    const newGear = await Gear.create({
      ...req.body,
      image_url: `/images/${req.file.originalname}`,
      owner_id: req.session.user_id,
    });
    res.status(200).json(newGear);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id',upload.single('img_file'), async (req, res) => {
  console.log(req.session.user_id);
  console.log(`request body = `, req);
  try {
    const gearData = await Gear.findByPk(req.params.id)
    if (req.file.originalname) {
      image_url = `/images/${req.file.originalname}`
    } else{
      image_url = gearData.image_url
    }
    const newGearData = await Gear.update(
      {
      ...req.body,
      image_url: `/images/${req.file.originalname}`
      },
      {
      where: {
        id: req.params.id,
        owner_id: req.session.user_id,
      },
    });

    if (!newGearData) {
      res.status(404).json({ message: 'There is no camera gear matching this ID!' });
      return;
    }
    res.status(200).json(newGearData);
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