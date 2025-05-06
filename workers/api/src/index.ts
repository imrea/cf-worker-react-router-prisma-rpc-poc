import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client-generated'

export { ApiProxy } from './entrypoints'

export default {
  async fetch(_request, env, _ctx): Promise<Response> {
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })
    const users = await prisma.user.findMany()
    return Response.json(users)
  },
} satisfies ExportedHandler<Env>
