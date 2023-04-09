const router = require('express').Router();
const { Loan } = require('../../models');
const { Op } = require("sequelize"); // Operation function from sequelize
// this module holds all the api routes related to the loan object

// create a new loan instance
router.post('/', async (req, res) => {
  // grab request body and enrich it with borrower_id data retrieved from the session object
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

// updated loan instance
router.put('/:id', async (req, res) => {
  try {
    const loanData = await Loan.update(req.body, // updating loan instance the matched the id, and owner or borrower
      {
      where: {
        id: req.params.id,
        [Op.or]: [ // by default Where uses Op.and but since we need to allow both the owner and borrower to update the loan we use Op.or
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

// delete loan instance
router.delete('/:id', async (req, res) => {
  try {
    const loanData = await Loan.destroy({ // deleting loan instance the matched the id, and owner or borrower
      where: {
        id: req.params.id,
        [Op.or]: [ // by default Where uses Op.and but since we need to allow both the owner and borrower to update the loan we use Op.or
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