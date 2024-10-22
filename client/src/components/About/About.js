import React from 'react'
import Top from './topAbout'
import Story from './Story'
import Team from './Team'
// import LocationMap from './map'
export default function About() {
  return (
    <div>
     <Top />
     <Story />
     <Team />
     {/* <LocationMap pincode={444603}/> */}
    </div>
  )
}
