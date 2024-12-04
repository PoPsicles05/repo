'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
      setIsLoading(false)

      if (!user && pathname !== '/') {
        router.push('/')
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <html lang="en">
      <body>
        {isAuthenticated || pathname === '/' ? children : null}
      </body>
    </html>
  )
}
