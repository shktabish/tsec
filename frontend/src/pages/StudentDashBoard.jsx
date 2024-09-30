import MeetsCarousel from '@/components/Carousel'
import { ContributionChart } from '@/components/ContributionChart'
import MyMentors from '@/components/Mentors'
import { TimeSpentChart } from '@/components/TimeSpentChart'
import React from 'react'

const StudentDashBoard = () => {
  return (
    <div className='flex justify-start items-start' >
        <div className='w-3/4' >
            <MeetsCarousel />
            <div className='flex gap-4' >
                <div className='w-[48.25%]' >
                    <TimeSpentChart />
                </div>
                <div className='w-[48.25%]' >
                    <ContributionChart />
                </div> 
            </div>
            <div className='flex justify-around items-center border border-solid border-[#e5e5e5] rounded-lg p-4 my-4 w-[98.5%] h-[100px]' >
                <img src="./badge1.png" className='h-20 mb-4' />
                <img src="./badge2.png" className='h-20 mb-4' />
                <img src="./badge3.png" className='h-20 mb-4 grayscale' />
                <img src="./badge1.png" className='h-20 mb-4 grayscale' />
                <img src="./badge2.png" className='h-20 mb-4 grayscale' />
                <img src="./badge3.png" className='h-20 mb-4 grayscale' />
                <img src="./badge2.png" className='h-20 mb-4 grayscale' />
                <img src="./badge3.png" className='h-20 mb-4 grayscale' />
            </div>
        </div>
        <div className=' w-full' >
            <MyMentors />
        </div>
    </div>
  )
}

export default StudentDashBoard