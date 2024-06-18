import glicko2 from 'glicko2'

const settings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy."
  tau : 0.5,
  // rating : default rating
  rating : 1500,
  //rd : Default rating deviation 
  //     small number = good confidence on the rating accuracy
  rd : 200,
  //vol : Default volatility (expected fluctation on the player rating)
  vol : 0.06
};

// const ranking = new glicko2.Glicko2(settings);

export const getNewUserStats = (success, userRating, puzzleRating, userRatingDeviation, puzzleRatingDeviation) => {
  const ranking = new glicko2.Glicko2(settings);
  console.log("userRating: ", userRating);
  console.log("userRatingDeviation: ", userRatingDeviation);
  const User = ranking.makePlayer(userRating, userRatingDeviation);

  console.log("puzzleRating: ", puzzleRating);
  console.log("puzzleRatingDeviation: ", puzzleRatingDeviation);
  const Puzzle = ranking.makePlayer(puzzleRating, puzzleRatingDeviation);

  const matches = [];
  matches.push([User, Puzzle, success ? 1 : 0])
  ranking.updateRatings(matches);

  return {
    new_rating: Math.floor(User.getRating()),
    new_rating_deviation: User.getRd()
  }
}