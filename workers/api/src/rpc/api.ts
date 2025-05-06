import type { PrismaClient } from '@prisma/client-generated'
import { RpcTarget } from 'cloudflare:workers'

import type { RpcUser } from '../types'
import { Admin } from './admin'
import { Private } from './private'
import { Public } from './public'

class NoOp extends RpcTarget {}

export class ApiClient extends RpcTarget {
  private db: PrismaClient
  private user: RpcUser | null

  constructor({
    db,
    user,
  }: {
    db: PrismaClient
    user: { id: string; role: string } | null
  }) {
    super()
    this.db = db
    this.user = user
  }

  get public() {
    return new Public({ db: this.db })
  }

  get private(): Partial<Private> {
    return this.user
      ? new Private({ db: this.db, user: this.user })
      : new NoOp()
  }

  get admin(): Partial<Admin> {
    return this.user?.role === 'admin'
      ? new Admin({ db: this.db, user: this.user })
      : new NoOp()
  }
}
