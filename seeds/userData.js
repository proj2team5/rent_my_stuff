const { User } = require('../models');

const userdata = [
    {
        email: 'pixelpenguin@email.com',
        username: 'pixelPenguin',
        password: 'password123',
    },
    {
        email: 'photoguru@email.com',
        username: 'photoGuru21',
        password: 'password123',
    },
    {
        email: 'lensflarepro@email.com',
        username: 'lensFlarePro',
        password: 'password123',
    },
    {
        email: 'camerawizard@email.com',
        username: 'cameraWizard2023',
        password: 'password123',
    },
    {
        email: 'luckylens@email.com',
        username: 'LuckyLens',
        password: 'password123',
    },
];

const seedUser = () => User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;