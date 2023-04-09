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


//  LOAN association to USER
User.hasMany(Loan, {
  foreignKey: 'owner_id',
  as: 'items_lent', //since loan model references the user model in two different field we use an alias for future querying
  onDelete: 'CASCADE'
});

Loan.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'lender' //since user model will is referenced in two different field we use an alias for future querying
});

User.hasMany(Loan, {
    foreignKey: 'borrower_id',
    as: 'items_borrowed', //since loan model references the user model in two different field we use an alias for future querying
    onDelete: 'NO ACTION'
});

Loan.belongsTo(User, {
    foreignKey: 'borrower_id',
    as: 'borrower' //since user model will is referenced in two different field we use an alias for future querying
});
////////////////////////////////////////////////////////////////


// LOAN association to GEAR
Gear.hasMany(Loan, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Loan.belongsTo(Gear, {
  foreignKey: 'product_id',
});
////////////////////////////////////////////////////////////////



// RATINGS association to GEAR
Gear.hasMany(Rating, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

Rating.belongsTo(Gear, {
  foreignKey: 'product_id',
});
////////////////////////////////////////////////////////////////

// RATINGS association to USER
User.hasMany(Rating, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id',
});
////////////////////////////////////////////////////////////////
module.exports = { User, Gear, Loan, Rating };