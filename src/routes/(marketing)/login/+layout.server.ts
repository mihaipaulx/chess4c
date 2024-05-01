import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({
  url,
  locals: { getSession },
}) => {
  const session = await getSession()

  // if the user is already logged in return them to the dashboard
  if (session) {
    throw redirect(303, "/dashboard")
  }

  return {
    session: session,
    url: url.origin,
  }
}
