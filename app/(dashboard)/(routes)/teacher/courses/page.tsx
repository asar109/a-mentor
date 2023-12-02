import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function page() {
  return (
    <div className="p-4">
        <Link href="/teacher/create">
      <Button>
          <a>Create Course</a>
      </Button>
        </Link>
    </div>
  )
}

export default page