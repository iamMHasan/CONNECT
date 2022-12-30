import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useUserAbout = email =>{
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})
   useEffect(()=>{
    setLoading(true)
    fetch(`https://connect-server-gamma.vercel.app/userInfo?email=${email}`)
    .then(res => res.json())
    .then(data =>{
        setLoading(false)
        setUserInfo(data)
    })
   },[email])
   return [userInfo, loading]
}

