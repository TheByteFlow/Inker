import React, { FC } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const EmailInput:FC= () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}

export default EmailInput