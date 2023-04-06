const { Loan } = require('../models');

const loandata = [
    {
        product_id: 1,
        cost_per_day: 350.00,
        status: 'RETURNED',
        received_date: 'March 28, 2023',
        returned_date: 'March 30, 2023',
        owner_id: 1,
        borrower_id: 5,
    },
    {
        product_id: 3,
        cost_per_day: 65.00,
        status: 'REQUESTED',
        received_date: 'May 10, 2023',
        returned_date: 'May 12, 2023',
        owner_id: 3,
        borrower_id: 5,
    },
    {
        product_id: 12,
        cost_per_day: 200.00,
        status: 'RECEIVED',
        received_date: 'May 5, 2023',
        returned_date: 'May 10, 2023',
        owner_id: 4,
        borrower_id: 5,
    },
    
];

const seedLoan = () => Loan.bulkCreate(loandata, {
    individualHooks: true,
    returning: true,
});

module.exports = seedLoan;