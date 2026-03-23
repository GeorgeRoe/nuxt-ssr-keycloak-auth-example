import type { User } from "#auth-utils";
import is from '@sindresorhus/is'

export function isUser(user: unknown): user is User {
  return is.plainObject(user) &&
    is.string(user.id) &&
    is.string(user.name) &&
    is.string(user.email) &&
    is.array(user.roles, isRole)
}