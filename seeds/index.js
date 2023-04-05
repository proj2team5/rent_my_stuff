const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedGear = require('./gearData');
const seedLoan = require('./loanData');
const seedRating = require('./ratingData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedGear();

  await seedLoan();

  await seedRating();

  process.exit(0);
};

seedAll();
