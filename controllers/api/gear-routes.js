const router = require('express').Router();
const { Gear } = require('../../models');
const upload = require('../../utils/upload'); // middleware to upload images
// this module holds all the api routes related to the gear object

// Create a new gear instance
router.post('/', upload.single('img_file'), async (req, res) => {
  // retrieves the post request body
  // the upload middleware will expect up to one file object to be provided
  // the middleware will place all images in the /public/images folder
  // the middleware will add a new file object where we can extract originalname which is also used when saving the file
  // we can then pass /images/${req.file.originalname} to the database under the image_url parameter
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

// Update a gear instance
router.put('/:id',upload.single('img_file'), async (req, res) => {
  try {
    // Since we need to manipulate the data for image_url before pushing to the database
    // this causes an issue when the image does not need to be updated
    // to fix this we are pulling the gear data ahead of the update to retrieve the current image_url
    const gearData = await Gear.findByPk(req.params.id) 
    const gear = gearData.get({ plain: true });
    try {
      if (req.body.img_file && req.body.img_file != 'undefined') {
        image_url = `/images/${req.file.originalname}`
      } else{
        image_url = gear.image_url // if img_file is not specified use original image
      }
    }catch (err) {
      image_url = gear.image_url // if img_file is not specified use original image
    }
    const newGearData = await Gear.update( //update gear
      {
      ...req.body,
      image_url: image_url
      },
      {
      where: {
        id: req.params.id,
        owner_id: req.session.user_id, //make sure the gear being updated belongs to the user sending the put request
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

// delete a gear instance
router.delete('/:id', async (req, res) => {
  try {
    const gearData = await Gear.destroy({ //.destroy to remove instance from db
      where: {
        id: req.params.id,
        owner_id: req.session.user_id, //make sure the gear being updated belongs to the user sending the put request
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