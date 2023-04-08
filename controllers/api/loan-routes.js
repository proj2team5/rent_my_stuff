const router = require('express').Router();
const { Loan } = require('../../models');
const { Op } = require("sequelize");

router.post('/', async (req, res) => {

  try {
    const newLoan = await Loan.create({
      ...req.body,
      borrower_id: req.session.user_id,
    });
    res.status(200).json(newLoan);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const loanData = await Loan.update(req.body,
      {
      where: {
        id: req.params.id,
        [Op.or]: [
            { owner_id: req.session.user_id },
            { borrower_id: req.session.user_id }
        ],
      },
    });

    if (!loanData) {
      res.status(404).json({ message: 'There is no loan matching this ID!' });
      return;
    }
    res.status(200).json(loanData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const loanData = await Loan.destroy({
      where: {
        id: req.params.id,
        [Op.or]: [
          { owner_id: req.session.user_id },
          { borrower_id: req.session.user_id }
        ],
      },
    });

    if (!loanData) {
      res.status(404).json({ message: 'There is no loan matching this ID!' });
      return;
    }
    res.status(200).json(loanData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;