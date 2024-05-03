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

  const { data, error: userRatingError } = await supabaseServiceRole
    .from("profiles")
    .select("rating")
    .filter("id", "eq", userId)
    .limit(1)
    .single()

  if (userRatingError) {
    console.error('Error fetching current user:', userRatingError.message);
    // Handle error appropriately, perhaps redirecting to an error page
    throw userRatingError;
  }

  const userRating = data?.rating

  console.log("User rating: ", userRating)

  const [minPuzzleRating, maxPuzzleRating] = [userRating - 50, userRating + 50]

  console.log(`Puzzle rating range: [${minPuzzleRating}, ${maxPuzzleRating}]`);
  

  const { data: randomPuzzles, error: randomPuzzlesError } = await supabaseServiceRole
    .from('random_puzzles')
    .select()
    .gte("rating", minPuzzleRating)
    .lte("rating", maxPuzzleRating)

  if (randomPuzzlesError) {
    console.error('Error fetching random puzzle:', randomPuzzlesError.message);
    // Handle error appropriately, perhaps redirecting to an error page
    throw randomPuzzlesError;
  }
  
  console.log('Random puzzles:', randomPuzzles.length);

  return {
    props: {
      randomPuzzles
    }
  };

}