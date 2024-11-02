import { LoaderCircle } from 'lucide-react'
import React from 'react'

export const LoadingQuestionPage = () => {
  return (
    <div className="flex gap-2 items-center justify-center h-screen text-gray-500">
        <LoaderCircle strokeWidth={1.50} className='animate-spin' />
        <h1 className="text-3xl font-medium">Cargando...</h1>
    </div>
  )
}
