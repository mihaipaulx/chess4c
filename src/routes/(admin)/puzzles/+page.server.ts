import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({
  locals: { getSession, supabaseServiceRole },
}) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, "/login")
  }

  const userId = session.user.id

  const { data: user, error: userRatingError } = await supabaseServiceRole
    .from("profiles")
    .select()
    .filter("id", "eq", userId)
    .limit(1)
    .single()

  if (userRatingError) {
    console.error('Error fetching current user:', userRatingError.message);
    // Handle error appropriately, perhaps redirecting to an error page
    throw userRatingError;
  }

  const userRating = user?.rating

  console.log("User rating: ", userRating)

  const [minPuzzleRating, maxPuzzleRating] = [userRating - 100, userRating + 100]

  console.log(`Puzzle rating range: [${minPuzzleRating}, ${maxPuzzleRating}]`);

  const { data: randomPuzzle, error: randomPuzzleError } = await supabaseServiceRole
    .from('random_puzzles')
    .select()
    .gte("rating", minPuzzleRating)
    .lte("rating", maxPuzzleRating)
    .limit(1)
    .single()

  if (randomPuzzleError) {
    console.error('Error fetching random puzzle:', randomPuzzleError.message);
    // Handle error appropriately, perhaps redirecting to an error page
    throw randomPuzzleError;
  }
  
  console.log('Random puzzles:', randomPuzzle);

  return {
    props: {
      puzzle: randomPuzzle,
      user: user
    }
  };

}