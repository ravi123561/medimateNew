import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react'

export default function ReportsPage() {
    const [reports,setReports] = useState([]);

    //load from localstorage when component change
    useEffect(() => {
  const saved = localStorage.getItem('reports');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      setReports(parsed);
    } catch (err) {
      console.error("Failed to parse reports from localStorage:", err);
      localStorage.removeItem('reports'); // clear bad data
    }
  }
}, []);

    //sve to localstoragge whenever reports chanage
    useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

    const handleFileUpload = (event)=>{
        const files = Array.from(event.target.files);
        const newReports = files.map(file=>({
            id: Date.now()+Math.random(),
            name : file.name,
            url : URL.createObjectURL(file),
            type: file.type,
        }));
        setReports(prev => [...prev,...newReports]);
    }
    const handleDelete = (id)=>{
        setReports(reports.filter(report=>report.id!==id));
    };
  return (
    <div  className='w-full h-screen bg-cover bg-center'style={{backgroundImage: "url('/reports.avif')"} }>
       <h2 className='text-2xl font-mine mb-4'>Medical Reports</h2>
       <input type='file' accept='.pdf,.png,.jpg,jpeg ' multiple onChange={handleFileUpload} className='blockmb-4' />
     
       <ul className='space-y-3'>
            {
                reports.map(report=>(
                    <li key={report.id} className='flex items-center justify-between bg-gray-100 p-2 rounded shadow'>
                        <span className=''>{report.name}</span>
                        <div className='space-x-2'>
                            <a href={report.url} target='_blank' className='text-red-500 underline'>View</a>
                            <button onClick={()=>handleDelete(report.id)} className='text-red-400 hover:underline'>
                                Delete
                            </button>
                        </div>
                    </li>
                ))
            }
       </ul>
    </div>
  )
}
