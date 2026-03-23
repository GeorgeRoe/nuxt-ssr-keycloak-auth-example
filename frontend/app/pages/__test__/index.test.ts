import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import IndexPage from '../index.vue' // Adjust path if this is in /pages
import type { User } from '#auth-utils'

const mockUseUserSession = vi.hoisted(() => vi.fn())

function mockUseUserSessionReturnValue(user: User | null) {
  mockUseUserSession.mockReturnValue({
    user,
    fetch: () => Promise.resolve(),
    clear: () => Promise.resolve()
  })
}

const mockUseBackendApi = vi.hoisted(() => vi.fn())

mockNuxtImport('useUserSession', () => mockUseUserSession)
mockNuxtImport('useBackendApi', () => mockUseBackendApi)

describe('Authentication UI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the welcome message and user roles when authenticated', async () => {
    // Ensure the state represents a "logged in" user
    mockUseUserSessionReturnValue({ 
      id: '123', 
      name: 'Grace Hopper', 
      email: 'grace@example.com',
      roles: [ Role.TEST_ROLE ]
    })

    mockUseBackendApi.mockReturnValue(Promise.resolve({
      data: { message: 'Secure data from Rust' },
      error: null
    }))

    const wrapper = await mountSuspended(IndexPage)

    // Check that the UI correctly displays the data
    expect(wrapper.html()).toContain('Welcome, Grace Hopper!')
    expect(wrapper.html()).toContain('grace@example.com')
    expect(wrapper.html()).toContain(Role.TEST_ROLE)
    expect(wrapper.html()).not.toContain('Log in with Keycloak')

    expect(wrapper.html()).toContain('Secure data from Rust')
  })

  it('handles 401 Unauthorised gracefully and displays login prompt', async () => {
    // Mutate the hoisted state to simulate a "logged out" user and a 401 error
    mockUseUserSessionReturnValue(null)

    mockUseBackendApi.mockReturnValue(Promise.resolve({
      data: null,
      error: { statusCode: 401, statusMessage: 'Unauthorised' }
    }))

    const wrapper = await mountSuspended(IndexPage)

    // Verify the secure data is entirely hidden
    expect(wrapper.html()).not.toContain('Welcome')
    
    // Verify the fallback UI kicks in perfectly
    expect(wrapper.html()).toContain('You are currently unauthenticated.')
    expect(wrapper.find('a[href="/api/auth/login"]').exists()).toBe(true)
  })
})