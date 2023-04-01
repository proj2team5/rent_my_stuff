const User = require('./User');
const Gear = require('./Gear');


User.hasMany(Gear, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Gear.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'lender'
});

User.hasMany(Gear, {
    foreignKey: 'borrower_id',
    onDelete: 'CASCADE'
});

Gear.belongsTo(User, {
    foreignKey: 'borrower_id',
    as: 'borrower'
});


module.exports = { User, Gear };