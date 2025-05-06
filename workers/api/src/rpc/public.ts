import { RpcTarget } from 'cloudflare:workers'

import type { PublicRpcContext } from '../types'

export class Public extends RpcTarget {
  constructor(private ctx: PublicRpcContext) {
    super()
  }

  pub() {
    return 'Hello from Public scope'
  }
}
