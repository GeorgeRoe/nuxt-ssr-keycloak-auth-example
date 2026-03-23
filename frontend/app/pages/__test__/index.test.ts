// app.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import IndexPage from '../index.vue' // Adjust path if this is in /pages
import type { User } from '#auth-utils'

const mockState = vi.hoisted(() => ({
  user: { 
    id: '123', 
    name: 'Grace Hopper', 
    email: 'grace@example.com', 
    roles: ['admin'] 
  } as User | null,
  apiData: { message: 'Secure data from Rust' } as any,
  apiError: null as any
}))

mockNuxtImport('useUserSession', () => {
  return () => ({
    get user() { return mockState.user },
    fetch: () => Promise.resolve(),
    clear: () => Promise.resolve()
  })
})

mockNuxtImport('useBackendApi', () => {
  return () => Promise.resolve({
    get data() { return mockState.apiData },
    get error() { return mockState.apiError }
  })
})

describe('Authentication UI', () => {
  it('renders the welcome message and user roles when authenticated', async () => {
    // Ensure the state represents a "logged in" user
    mockState.user = { id: '123', name: 'Grace Hopper', email: 'grace@example.com', roles: ['admin'] }
    mockState.apiData = { message: 'Secure data from Rust' }
    mockState.apiError = null

    const wrapper = await mountSuspended(IndexPage)

    // Check that the UI correctly displays the data
    expect(wrapper.html()).toContain('Welcome, Grace Hopper!')
    expect(wrapper.html()).toContain('grace@example.com')
    expect(wrapper.html()).toContain('admin')
    expect(wrapper.html()).not.toContain('Log in with Keycloak')

    expect(wrapper.html()).toContain('Secure data from Rust')
  })

  it('handles 401 Unauthorised gracefully and displays login prompt', async () => {
    // Mutate the hoisted state to simulate a "logged out" user and a 401 error
    mockState.user = null
    mockState.apiData = null
    mockState.apiError = { statusCode: 401, statusMessage: 'Unauthorised' }

    const wrapper = await mountSuspended(IndexPage)

    // Verify the secure data is entirely hidden
    expect(wrapper.html()).not.toContain('Welcome')
    
    // Verify the fallback UI kicks in perfectly
    expect(wrapper.html()).toContain('You are currently unauthenticated.')
    expect(wrapper.find('a[href="/api/auth/login"]').exists()).toBe(true)
  })
})