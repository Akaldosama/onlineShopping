import React from 'react'
import Recommend from './recommendations/Recommend'
import Cheap from './cheap/Cheap'
import About from './About'

export default function Dashboard() {
  return (
    <div>
        <Recommend />
        <Cheap />
        <About />
    </div>
  )
}