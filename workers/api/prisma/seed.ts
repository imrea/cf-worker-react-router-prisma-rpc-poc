import { resolve } from 'node:path'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client-generated'
import { getPlatformProxy } from 'wrangler'

const { env, dispose } = await getPlatformProxy<Env>({
  persist: { path: resolve('../../.wrangler/state/v3') },
})
const db = new PrismaClient({ adapter: new PrismaD1(env.DB) })
let exit = 0

try {
  await db.user.deleteMany()
  await db.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'admin',
      },
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
      },
    ],
  })
  console.log(`✅ Added ${await db.user.count()} Users`)
} catch (err) {
  console.error(err)
  exit = 1
} finally {
  await db.$disconnect()
  await dispose()
  process.exit(exit)
}
