import React from 'react'
import Recommend from './recommendations/Recommend'
import Cheap from './cheap/Cheap'

export default function Dashboard() {
  return (
    <div>
        <Recommend />
        <Cheap />
    </div>
  )
}