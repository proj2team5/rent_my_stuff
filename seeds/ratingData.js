const { Rating } = require('../models');

const ratingdata = [
    {
        user_id: 1,
        product_id: 1,
        type: 'BORROWER',
        rating: 5,
        comment: 'Great choice for professional photographers who demand top-of-the-line performance!'
    },
];

const seedRating = () => Rating.bulkCreate(ratingdata, {
    individualHooks: true,
    returning: true,
});

module.exports = seedRating;