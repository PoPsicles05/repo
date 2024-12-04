'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...')

  useEffect(() => {
    checkConnection()
  }, [])

  async function checkConnection() {
    try {
      const { data, error } = await supabase.from('users').select('*').limit(1)
      if (error) throw error
      setConnectionStatus('Connected successfully!')
    } catch (error) {
      console.error('Error connecting to Supabase:', error)
      setConnectionStatus('Connection failed. Check console for details.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Status: {connectionStatus}</p>
          <Button onClick={checkConnection}>Test Connection Again</Button>
        </CardContent>
      </Card>
    </div>
  )
}