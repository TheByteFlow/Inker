import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { FC } from 'react'

const PictureInput:FC = () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label className='text-black font-semibold'>Picture</Label>
        <Input id="picture" type='file' placeholder='upload new profile'/>

    </div>
  )
}

export default PictureInput