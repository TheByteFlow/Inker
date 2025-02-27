import React, { FC } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const UsernameInput:FC = () => {
  return (
<div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" className='text-black'>username</Label>
      <Input type="email" id="email" placeholder="Email" />
      <p className="text-gray-500 text-sm mt-4">This is your display name. It can be your real name or a pseudonym.you can only change this once every 30 days</p>
    </div>
  )
}

export default UsernameInput