'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function ContentPage() {
  useEffect(() => {
    redirect('/home')
  }, [])

  return null
}