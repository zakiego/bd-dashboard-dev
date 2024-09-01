'use client'

import { refreshTweetByTweetId } from '@/app/dashboard/(internal)/tweets/actions'
import { Button } from '@/components/button'
import { ArrowPathIcon, EyeIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { toast } from 'sonner'

interface ButtonUpdateTweetProps {
  id: string
}

export const ButtonUpdateTweet = (props: ButtonUpdateTweetProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateTweet = async () => {
    setIsLoading(true)
    const response = await refreshTweetByTweetId(props.id)
    setIsLoading(false)
    if (!response.ok) {
      toast.error(response.message)
      return
    }
    toast.success(response.message)
  }

  return (
    <Button disabled={isLoading} onClick={handleUpdateTweet} className="mt-4">
      {isLoading ? 'Updating...' : 'Update Tweet'}
    </Button>
  )
}

export const TableCellActionTweet = (props: { id: string }) => {
  return (
    <div className="-mx-3 -my-1.5 flex space-x-1 !text-xs sm:-mx-2.5">
      <Button outline>
        <EyeIcon className="h-2 w-2" />
        View
      </Button>
      <Button
        outline
        onClick={async () => {
          const response = await refreshTweetByTweetId(props.id)
          if (!response.ok) {
            toast.error(response.message)
            return
          }
          toast.success(response.message)
        }}
      >
        <ArrowPathIcon className="h-2 w-2" />
        Refresh
      </Button>
    </div>
  )
}
