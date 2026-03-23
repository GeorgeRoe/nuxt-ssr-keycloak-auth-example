import { Role } from '#imports'

export function isRole(role: string): role is Role {
	return Object.values(Role).includes(role as Role)
}