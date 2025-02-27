import React, { FC } from 'react'
import { Textarea} from "@/components/ui/textarea"

import { Label } from '@radix-ui/react-dropdown-menu'
import KeyValueInput from './NestedItems/KeyValueInput'
import Button from '@/components/ui/button'



const BioInput :FC = () => {
  return (
    <div>
        <Label>Bio</Label>
        <Textarea placeholder="Type your message here." />

        <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Social Media URLs</h2>
      <p className="text-gray-500 text-sm">Add links to your website, blog, or social media profiles.</p>

      <KeyValueInput />
      <KeyValueInput />

      <Button variant="outline">Add URL</Button>
    </div>
    </div>
  )
}

export default BioInput