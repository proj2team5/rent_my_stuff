module.exports = {
    //helper function used in handlebars pages
      check_requested: (status) => {
        return status === "REQUESTED"; //convert date to m/d/yyyy format
      },
      check_denied: (status) => {
        return status === "DENIED"; //convert date to m/d/yyyy format
      },
      check_received: (status) => {
        return status === "RECEIVED"; //convert date to m/d/yyyy format
      },
      check_returned: (status) => {
        return status === "RETURNED"; //convert date to m/d/yyyy format
      },
      get_average_rating: (ratings) => {
        if (ratings && ratings.length){
          var borrower_ratings = ratings.filter(rating => rating.type === 'BORROWER');
        }else{
          var borrower_ratings = [];
        }

        if (borrower_ratings.length){
            return borrower_ratings.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/borrower_ratings.length
        }else{
            return "no ratings"
        }
      },
      count_request: (loans) => {
        const requests = loans.filter(loan => loan.status === 'REQUESTED');
        return requests.length
      },
};