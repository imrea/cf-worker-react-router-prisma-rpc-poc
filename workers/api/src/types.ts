import type { PrismaClient } from '@prisma/client-generated'

export interface RpcUser {
  id: string
  role: string
}

export interface PublicRpcContext {
  db: PrismaClient
}
export interface PrivateRpcContext {
  db: PrismaClient
  user: RpcUser
}
