const User = require('./User');
const Gear = require('./Gear');
const Loan = require('./Loan');
const Rating = require('./Rating');

// GEAR association to USER
User.hasMany(Gear, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Gear.belongsTo(User, {
  foreignKey: 'owner_id',
});


// LOAN association to USER
User.hasMany(Loan, {
  foreignKey: 'owner_id',
  as: 'items_lent',
  onDelete: 'CASCADE'
});

Loan.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'lender'
});

User.hasMany(Loan, {
    foreignKey: 'borrower_id',
    as: 'items_borrowed',
    onDelete: 'NO ACTION'
});

Loan.belongsTo(User, {
    foreignKey: 'borrower_id',
    as: 'borrower'
});

// LOAN association to GEAR
Gear.hasMany(Loan, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Loan.belongsTo(Gear, {
  foreignKey: 'product_id',
});

// RATINGS association to GEAR
Gear.hasMany(Rating, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Rating.belongsTo(Gear, {
  foreignKey: 'product_id',
});


// RATINGS association to USER
User.hasMany(Rating, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Gear, Loan, Rating };