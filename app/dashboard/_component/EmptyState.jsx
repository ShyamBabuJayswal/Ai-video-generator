import { Button } from '@/components/ui/button'
import React from 'react'

function EmptyState() {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed'>
       <h2>You do not have any short video created</h2>
       <Button>Create New Short Video</Button>
    </div>
  )
}

export default EmptyState