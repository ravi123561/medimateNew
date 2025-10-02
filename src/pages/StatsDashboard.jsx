import React from 'react'
import {toast} from 'react-toastify';
import {
  BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer
} from 'recharts';
import { useEffect } from 'react';
export default function StatsDashboard() {
  const data = [
    {day : 'Mon', taken: 2, missed: 1},
    {day : 'Tue', taken: 3, missed: 0},
    {day : 'Wed', taken: 1, missed: 2},
    {day : 'Thu', taken: 3, missed: 0},
    {day : 'Fri', taken: 2, missed: 1},
    {day : 'Sat', taken: 3, missed: 0},
    {day : 'Sun', taken: 2, missed: 1},
  ];

  const streakData = [
  true, false, true, true, false, true, true,
  true, true, false, false, true, true, true,
  true, true, true, false, true, false, true,
  true, true, true, false, true, true, false,
  true, true, true, true, false, true, true
];





  return (
    <div className='p-4 space-y-6' style={{backgroundImage: "url('/stats.jpg')"} } >
        <h2 className='text-2xl font-serif mb-4'>📈 Weekly Medicine Stats</h2>

        <div className='bg-white rounded shadow p-4'>
            <h3 className='text-lg font-thin'>✅ Doses Taken This Week: 80%</h3>
        </div>

        <div className='bg-white rounded shadow p-4'>
            <h3 className='text-lg font-thin '>📊 7-Day Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="day"/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="taken" fill="Green" name="Taken"/>
                <Bar dataKey="missed" fill="Red" name="Missed"/>
              </BarChart>
            </ResponsiveContainer>
        </div>

         <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-thin mb-2"> Streak Tracker</h3>
        <div className='grid grid-cols-7 gap-2 mt-4'>
            {
              streakData.map((taken,index)=>(
                <div key={index} onClick={()=>
                  toast.info(`Day ${index+1} : ${taken?'Taken' : 'Missed'}`)
                } className={`w-6 h-6 rounded-sm cursor-pointer ${
                taken ? 'bg-green-400':'bg-gray-400'
                } `}  >

                </div>
              ))
            }
        </div>
        
      </div>
    </div>
  )
}
