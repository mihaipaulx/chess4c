import glicko2 from 'glicko2'

const settings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy."
  tau : 0.5,
  // rating : default rating
  rating : 1000,
  //rd : Default rating deviation 
  //     small number = good confidence on the rating accuracy
  rd : 350,
  //vol : Default volatility (expected fluctation on the player rating)
  vol : 0.06
};

const ranking = new glicko2.Glicko2(settings)

const Me = ranking.makePlayer(1500, 350)
const Puzzle = ranking.makePlayer(1491, 74)

const matches = []
matches.push([Me, Puzzle, 1])
ranking.updateRatings(matches)

console.log("My new rating: " + Me.getRating());
console.log("My new rating deviation: " + Me.getRd());