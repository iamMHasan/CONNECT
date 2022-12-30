import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import Loading from '../../Component/loading/Loading';
import { AuthContext } from '../../Context/AuthProvider';
import EditAboutModal from './EditAboutModal';

const About = () => {
    const { user } = useContext(AuthContext)
    const { data: userInfo = [], refetch, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await fetch(`https://connect-server-gamma.vercel.app/userInfo?email=${user?.email}`)
            const data = await res.json()
            return data;
        }
    })
    const { name, email, university, address, photoURL } = userInfo
    return (
        <>
            {
                isLoading ? <Loading /> : (
                    <>
                        <div className='w-[95%] md:w-[70%] bg-black/5 h-screen mx-auto flex flex-col justify-center p-4 '>
                            <div className='text-center'>
                                <img src={photoURL} alt="pic" className='w-24 h-24 rounded-full mt-2 mx-auto' />
                                <h1 className="text-xl font-semibold">{name ? name : '--'}</h1>
                            </div>
                            <div className='mb-2'>
                                <h1 className="text-xl mb-1">Email: </h1>
                                <h1 className="text-xl font-semibold bg-black/10 p-2 rounded"> {user?.email}</h1>
                            </div>
                            <div className='mb-2'>
                                <h1 className="text-xl mb-1">Address: </h1>
                                <h1 className="text-xl font-semibold bg-black/10 p-2 rounded"> {address ? address : '-'}</h1>
                            </div>
                            <div className='mb-2'>
                                <h1 className="text-xl mb-1">University: </h1>
                                <h1 className="text-xl font-semibold bg-black/10 p-2 rounded"> {university ? university : '-'}</h1>
                            </div>
                            <div className='mt-4'>
                                <button type="button" class="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 
      duration-150
      ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Edit details
                                </button>
                            </div>
                            <EditAboutModal refetch={refetch} />
                        </div>
                    </>
                )
            }
        </>
    );
};

export default About;