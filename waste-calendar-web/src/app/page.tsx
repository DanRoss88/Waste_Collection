'use client' 

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Calendar from '@/components/Calendar'
import CollectionTypeSelector from '@/components/CollectionTypeSelector'
import Header from '@/components/Header'
import LoginScreen from '../components/LoginScreen'
import { CollectionType } from '@/types'

export default function Home() {
  const { data: session, status } = useSession()
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectedType, setSelectedType] = useState<CollectionType>('GARBAGE')
  console.log(session, status);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!session) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <CollectionTypeSelector
                selectedType={selectedType}
                onTypeSelect={setSelectedType}
              />
            </div>
            <div className="md:col-span-2">
              <Calendar
                selectedDates={selectedDates}
                onDateSelect={setSelectedDates}
                collectionType={selectedType}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}