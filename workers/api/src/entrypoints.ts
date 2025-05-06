import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client-generated'
import { WorkerEntrypoint } from 'cloudflare:workers'

import { Admin } from './rpc/admin'
import { Private } from './rpc/private'
import { Public } from './rpc/public'
import type { RpcUser } from './types'

export class ApiProxy extends WorkerEntrypoint<Env> {
  private db = new PrismaClient({ adapter: new PrismaD1(this.env.DB) })

  private async fetchUser(id?: string): Promise<RpcUser | null> {
    return this.db.user.findFirst({
      where: { id },
      select: { id: true, role: true },
    })
  }

  async getTestUserId() {
    return this.db.user
      .findFirstOrThrow({ where: { role: 'user' } })
      .then((u) => u.id)
  }

  async getTestAdminId() {
    return this.db.user
      .findFirstOrThrow({ where: { role: 'admin' } })
      .then((u) => u.id)
  }

  async forUser(userId?: string) {
    let user = await this.fetchUser(userId)
    return {
      public: new Public({ db: this.db }),
      private: user ? new Private({ db: this.db, user }) : undefined,
      admin:
        user?.role === 'admin' ? new Admin({ db: this.db, user }) : undefined,
    }
    // return new ApiClient({ db: this.db, user })
  }

  // multiply(a: number, b: number) {
  //   return a * b
  // }

  // baz(emoji: string) {
  //   return {
  //     bar: {
  //       foo: () => `You made it! ${emoji}`,
  //     },
  //   }
  // }
}
