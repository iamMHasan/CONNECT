import React, { useContext } from 'react';
import './SharePost.css'
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Button from '../Button/Button';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Loading from '../loading/Loading';
import { AuthContext } from '../../Context/AuthProvider';
import TextStyle from '../text/TextStyle';

const SharePost = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleSharePost = (e) => {
        setLoading(true)
        e.preventDefault()
        const text = e.target.text.value 
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
            console.log(data.data.url);
            const postData = {
                text,
                image : data.data.url,
                userName : user?.displayName,
                photoURL : user?.photoURL
            }
            fetch('https://connect-server-gamma.vercel.app/posts',{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(postData)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                toast.success('post added to media route')
                e.target.reset()
                setLoading(false)
                navigate('/media')
            })
            .catch(err =>{
                console.log(err);
                setLoading(false)
                setError('something is wrong!')
            })
        })
    }
    return (
        <div className='mt-10'>
           <TextStyle>Share your mood now</TextStyle>
           <div>
                <form onSubmit={handleSharePost} className='flex flex-col justify-end items-center'>
                    <div className="mb-1 w-[90%] xl:w-[70%]">
                        <textarea
                            className="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white 
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Start Writing"
                            name='text'
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end items-center">
                        <label className='py-1 px-2 leading-none mr-1  rounded-xl text-black hover:bg-black/30'> <div className="flex justify-center items-center"><AiOutlineCloudUpload size={20}></AiOutlineCloudUpload> Add image </div>
                            <input name='image' type="file" size="60" />
                        </label>
                        {
                            user?.uid ? <Button>{loading ? <Loading/> : 'Post'}</Button> : <h1 className="text-xl text-center">Please <Link to='/login'><span className='font-bold text-green-900'>login</span></Link> to submit post</h1>
                        }
                    </div>
                </form>
                {error && error}
            </div>
        </div>
    );
};

export default SharePost;