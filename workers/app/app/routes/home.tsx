import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/home'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export async function loader({ context }: Route.LoaderArgs) {
  let {
    cloudflare: {
      env: { API },
    },
  } = context
  let userId = await API.getTestUserId()
  // let userId = await API.getTestAdminId()

  using api = await API.forUser(userId)

  let isAdmin = Boolean(api.admin?.adm)
  let messages = await Promise.all([
    api.public.pub(),
    api.private?.priv(),
    api.admin?.adm(),
  ]).then((msgs) => msgs.filter(Boolean) as string[])

  let test = await Promise.all([api.private?.test(), api.admin?.test()]).then(
    (msgs) => msgs.filter(Boolean).at(-1) as string
  )

  console.log([...messages, test, `Is admin: ${isAdmin}`].join('\n'))

  return { message: messages.at(-1) || '' }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} />
}
