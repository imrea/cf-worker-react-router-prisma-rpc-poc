import { RpcTarget } from 'cloudflare:workers'

import type { PrivateRpcContext } from '../types'

export class Admin extends RpcTarget {
  constructor(private ctx: PrivateRpcContext) {
    super()
  }

  adm() {
    return `Hello, ${this.ctx.user.id}, from Admin scope`
  }

  async test() {
    let users = await this.ctx.db.user.count()
    return `There are ${users} Users`
  }
}
