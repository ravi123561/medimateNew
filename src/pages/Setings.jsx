import React, { useEffect, useState } from 'react'

export default function Setings() {
  const [darkMode,setdarkMode] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');

  useEffect(()=>{
    const savedTheme = localStorage.getItem('darkMode');
    const savedName = localStorage.getItem('profileName');
    const savedEmail = localStorage.getItem('profileEmail');

    if(savedTheme==='true'){
      setdarkMode(true);
      document.documentElement.classList.add('dark');
    }
    if(savedName) setName(savedName);
    if(savedEmail) setEmail(savedEmail);
  },[]);

  useEffect(()=>{
    localStorage.setItem('darkMode',darkMode);
    localStorage.setItem('profileName',name);
    localStorage.setItem('profileEmail',email);
    if(darkMode){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  },[darkMode,name,email]);

  return (
    <div className='p-4 space-y-6 h-full h-screen bg-cover bg-center' style={{backgroundImage: "url('/setting.jpg')"}}>
      <h2 className='text-2xl font-thin mb-3'>⚙️ Setting</h2>
      <div className='bg-white dark:bg-gray-500 rounded shadow p-4 space-y-4'>
        <label className='flex items-center space-x-2'>
          <input type='checkbox' checked={darkMode} onChange={()=>setdarkMode(prev =>!prev)}/>
          <span>🌙 Enable Dark Mode</span>
        </label>

        <div className='space-y-2'>
          <div>
            <label className='block font-thin'>Name</label>
            <input type='text' value={name} onChange={e=>setName(e.target.value)} className='w-full border p-2 rounded dark:bg-gray-300 dark:text-red-300'/>
          </div>

          <div>
            <label className='block font-thin'>Email</label>
            <input type='email' value={email} onChange={e=>setEmail(e.target.value)} className='w-full border p-2 rounded dark:bg-gray-300 dark:text-red-300'/>
          </div>
        </div>
      </div>
    </div>
  )
}
