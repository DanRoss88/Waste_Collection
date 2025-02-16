'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns'
import { useSession } from 'next-auth/react'
import { CollectionType } from '@/types'
import { createCalendarEvent } from '@/lib/googleCalendar'

interface CalendarProps {
  selectedDates: Date[]
  onDateSelect: (dates: Date[]) => void
  collectionType: CollectionType
}

export default function Calendar({
  selectedDates,
  onDateSelect,
  collectionType
}: CalendarProps) {
  const { data: session } = useSession()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startDay = getDay(monthStart)

  const handleDateClick = (date: Date) => {
    const isSelected = selectedDates.some(selectedDate => 
      isSameDay(selectedDate, date)
    )
    
    if (isSelected) {
      onDateSelect(selectedDates.filter(selectedDate => 
        !isSameDay(selectedDate, date)
      ))
    } else {
      onDateSelect([...selectedDates, date])
    }
  }

  const handleSaveToCalendar = async () => {
    if (!session) return
    
    setIsLoading(true)
    try {
      for (const date of selectedDates) {
        await createCalendarEvent({
          type: collectionType,
          date,
          recurrence: 'MONTHLY'
        }, session.accessToken as string)
      }
      onDateSelect([]) // Clear selection after saving
      alert('Events saved to calendar successfully!')
    } catch (error) {
      console.error('Error saving to calendar:', error)
      alert('Error saving events to calendar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const newDate = new Date(currentMonth)
              newDate.setMonth(currentMonth.getMonth() - 1)
              setCurrentMonth(newDate)
            }}
            className="p-2 rounded hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={() => {
              const newDate = new Date(currentMonth)
              newDate.setMonth(currentMonth.getMonth() + 1)
              setCurrentMonth(newDate)
            }}
            className="p-2 rounded hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="py-2" />
        ))}
        
        {days.map(day => {
          const isSelected = selectedDates.some(selectedDate => 
            isSameDay(selectedDate, day)
          )
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              className={`
                py-2 rounded-lg text-sm
                ${isSelected 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-100 text-gray-700'}
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      {selectedDates.length > 0 && (
        <div className="mt-6">
          <button
            onClick={handleSaveToCalendar}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save to Calendar'}
          </button>
        </div>
      )}
    </div>
  )
}