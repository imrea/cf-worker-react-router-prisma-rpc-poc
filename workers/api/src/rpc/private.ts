import { RpcTarget } from 'cloudflare:workers'

import type { PrivateRpcContext } from '../types'

export class Private extends RpcTarget {
  constructor(private ctx: PrivateRpcContext) {
    super()
  }

  priv() {
    return `Hello, ${this.ctx.user.id}, from Private scope.`
  }

  async test() {
    let users = await this.ctx.db.user.count()
    return `There are ${users} Users`
  }
}
