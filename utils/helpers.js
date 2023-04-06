module.exports = {
    //helper function used in handlebars pages
      check_requested: (status) => {
        return status === "REQUESTED"; //convert date to m/d/yyyy format
      },
      get_average_rating: (ratings) => {
        const borrower_ratings = ratings.filter(rating => rating.type === 'BORROWER');

        if (borrower_ratings.length){
            return borrower_ratings.map(rating => rating.rating).reduce((acc, amount) => acc + amount)/borrower_ratings.length
        }else{
            return "no ratings"
        }
      },
};