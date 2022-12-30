import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-hot-toast'
import Loading from '../../Component/loading/Loading';
import { AiOutlineCloudUpload } from "react-icons/ai";

const EditAboutModal = ({ refetch }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const handleUserInfo = e => {
        setLoading(true)
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const address = form.adress.value
        const university = form.university.value
        const image = e.target.image.files[0]

        const formData = new FormData()
        formData.append('image', image )
        const url = 'https://api.imgbb.com/1/upload?key=6fe1164c2c0eeca68905e318bf8d48ca'
        fetch(url, {
            method : 'POST',
            body : formData
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data?.data?.url);
            const userInfo = {
                name,
                address,
                university,
                email: user?.email,
                userPhoto :data?.data?.url,
            }
            fetch(`https://connect-server-gamma.vercel.app/userInfo/${user?.email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('updated info successfull')
                    setLoading(false)
                    form.reset()
                    refetch()
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false)
                })
        })
    }
    return (
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form onSubmit={handleUserInfo} className="modal-dialog relative w-auto pointer-events-none">
                <div
                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div
                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel"> Edit your Details</h5>
                        <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body relative p-4">
                        <div className="form-group mb-6">
                            <input type="text" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8"
                                name='name'
                                placeholder="Your name" />

                        </div>
                        <div className="form-group mb-6">
                            <input type="text" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8"
                                placeholder={user?.email} readOnly />
                        </div>
                        <div className="form-group mb-6">
                            <input type="text" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8"
                                name='adress'
                                placeholder='Your adress' />
                        </div>
                        <div className="form-group mb-6">
                            <input type="text" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8"
                                name='university'
                                placeholder='Your university' />
                        </div>
                        <label className='flex justify-start gap-2 items-center'>
                            <AiOutlineCloudUpload size={20}></AiOutlineCloudUpload>
                            <h1 className="text-xs">Update photo</h1>
                            <input name='image' type="file" size="60" />
                        </label>


                    </div>
                    <div
                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button type="button" className="px-6
  py-2.5
  bg-purple-600
  text-white
  font-medium
  text-xs
  leading-tight
  uppercase
  rounded
  shadow-md
  hover:bg-purple-700 hover:shadow-lg
  focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
  active:bg-purple-800 active:shadow-lg
  transition
  duration-150
  ease-in-out" data-bs-dismiss="modal">Close</button>
                        <button className="px-6
py-2.5
bg-blue-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out
ml-1">{loading ? <Loading /> : 'Save changes'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditAboutModal;