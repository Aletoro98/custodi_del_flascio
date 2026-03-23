// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init('phc_kaYghtwKtG9Oj6HGLR4mGJxnYoFmgkbRBuODlsj5952', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only', // Opzione consigliata per la privacy
  })
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}