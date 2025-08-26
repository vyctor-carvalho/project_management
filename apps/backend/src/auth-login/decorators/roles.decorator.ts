import { SetMetadata } from "@nestjs/common"
import { Role } from "src/roles/entities/role.entity"

export const ROLE_KEY = 'role'
export const Roles = (...roles: string[]) => SetMetadata(ROLE_KEY, roles)