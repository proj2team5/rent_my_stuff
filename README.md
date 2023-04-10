# share camGear (MVP) / rent_my_stuff

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Share camGear is a website that allows photographers to lend and borrow camera gear. To use the website, users must create a profile and log in. Once logged in, users can browse through a wide selection of camera equipment, including bodies, lenses, flashes, and lights, etc.

Each piece of gear listed on Share camGear is unique to the owner, and users can view details such as the cost per day, a detailed description of the gear, its name, and its availability. This information makes it easy for borrowers to find the right gear for their gig or hobby. SharecamGear also includes a gear review rating where borrowers can leave ratings and feedback on the gear they borrow (these are linked by owner_id). This provides valuable insight for future borrowers and helps maintain a level of trust. 

Users also have the ability to edit or delete their gear listings, giving them full control over what they lend out. Additionally, SharecamGear offers a unique feature where users can upload an image of the gear they are lending, by giving a URL link, which is our bonus technology not used for bootcamp.

Technologies used:
- Multer (for images)
- Javascript
- CSS / bootstrap
- mySql
- express / handlebars(for viewing the site) / session (strict rules such as: maxAge: 1000*60*60)
- google fonts
- brypt (for password encryption)
- node.js

AS a photographer or videographer,
I WANT a platform to share my camera gear with other creatives and rent their gear as well
SO THAT I can save money on buying expensive gear and earn money by renting out my gear to others.

GIVEN the SharecamGear rental platform,
WHEN I visit the site for the first time,
THEN I am presented with a homepage that displays existing rental listings, and options to sign up or log in.

WHEN I click on the sign-up option,
THEN I am directed to a registration page where I can create a new user account by entering my personal information such as my name, email address and a password.

WHEN I sign in with my user credentials,
THEN I am directed to my user profile page, which displays information about my rental history, reviews, and current rental listings.

WHEN I want to create a new rental listing,
THEN I can upload a photo, provide a detailed description of the gear I want to rent out, and set a rental rate and availability.

WHEN I want to view available listings,
THEN I can search for gear by category to find what I need.

WHEN I find the gear I want to rent,
THEN I can submit a rental request to the owner and it will give a notification to the lender.

WHEN the owner accepts my rental request via button,
THEN I should receive the gear that is requested.

WHEN my rental period is over,
THEN I can return the gear to the owner in good condition, and leave a review and rating to help other renters in the future.

WHEN I rent out my gear to others,
THEN I can manage my rental requests, approve or reject requests.

WHEN I have any issues or concerns with a rental,
THEN I can contact customer support through the platform to help resolve any problems (Located in the footer).

Future developments: Processing payment (maybe include shipping fees), viewing each individual user profile and looking at their reviews (for lender), aesthetics of the page...

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

The web application does not need to be installed as it is deployed in Heroku, Please see usage for the deployed link.

For running the site locally for test, please install these packages:
- `npm i`
- `npm i connect-session-sequelize`
- `npm i dotenv`
- `npm i express`
- `npm i express-handlebars`
- `npm i express-session`
- `npm i handlebars`
- `npm i mysql2`
- `npm i sequelize`
- `npm i bcrypt`
- `npm i multer` (For images, this is the one package never used before)


Please make a .env file for user details, this is sensitive information.
- `DB_NAME = "rental_db"`
- `DB_USER = "root"`
- `DB_PASSWORD = "Your Password"`

## Usage

Deployed Link:  https://still-mountain-71352.herokuapp.com/

Instructions: Once in the website you can make a user profile (through register). You can look through the products... then borrow from the homepage. My profile tab-link enables you to add a listing. For customer service, there is a link in the footer if issues arise.


For running the site locally for test, run the following commands in your terminal:
1. mysql -u root -p 
2. Enter your password 
3. source ./db/schema.sql; 
4. quit MySQL then type `node seeds/index.js`
5. visit: `http://localhost:3001/`


## License

The project is licensed under: MIT License. To see the license permissions for commercial and non-commercial use, check the link https://opensource.org/licenses/MIT

## Contributing

Sinthushan Sooriyakumar - [GitHub](https://github.com/sinthushan)
Hanna Zolotavina - [GitHub](https://github.com/hannazo)
Gabriel Tuason - [GitHub](https://github.com/gabetuason)
Hamzah Al-Emad - [GitHub](https://github.com/hamzahthefantastic)
Aleksandr Bausher - [GitHub](https://github.com/AleksandrBausher) 
 
## Tests

None
  
## Questions

For any questions about the application, please contact any of the members above.