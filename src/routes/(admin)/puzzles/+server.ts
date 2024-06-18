import { redirect } from "@sveltejs/kit"

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals: { getSession, supabaseServiceRole } }) => { 
  const session = await getSession()
  
  if (!session) {
    throw redirect(303, "/login")
  }

  const response = await request.json();

  const data = response.postData

  console.log("POST data", data);
  
  
  const { error: userPuzzlesError } = await supabaseServiceRole
    .from('user_puzzles')
    .insert(data);

  if (userPuzzlesError) {
    return new Response(JSON.stringify({ error: userPuzzlesError.message }), { status: 500 });
  }

  const { error: userError } = await supabaseServiceRole
    .from('profiles')
    .update({
      'rating': data.new_rating,
      'rating_deviation': data.new_rating_deviation,
    })
    .eq('id', data.user_id)

  if (userError) {
    return new Response(JSON.stringify({ error: userError.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'User puzzle recorded.' }), { status: 200 });
};