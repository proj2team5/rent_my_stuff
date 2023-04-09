module.exports = {
    //helper function used in handlebars pages
      check_requested: (status) => { // checks status === "REQUESTED"
        return status === "REQUESTED"; 
      },
      check_denied: (status) => { // checks status === "DENIED"
        return status === "DENIED"; 
      },
      check_received: (status) => { // checks status === "RECEIVED"
        return status === "RECEIVED"; 
      },
      check_returned: (status) => { // checks status === "RETURNED"
        return status === "RETURNED"; 
      },
      same_user: (owner, user) => { //checks if the product owner is same aas session user
        return owner === user;
      },
      get_average_rating: (ratings) => { //calculates the average borrower rating
        if (ratings && ratings.length){
          var borrower_ratings = ratings.filter(rating => rating.type === 'BORROWER'); // filter list for only borrower rating
        }else{
          var borrower_ratings = []; // if rating is not provided then borrower ratings is an empty list
        }

        if (borrower_ratings.length){ // if borrower ratings exist then calculate average else return "no ratings"
            return borrower_ratings.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/borrower_ratings.length
        }else{
            return "no ratings"
        }
      },
      count_request: (loans) => { // count the number of borrow requests for the user
        const requests = loans.filter(loan => loan.status === 'REQUESTED');
        return requests.length
      },
};