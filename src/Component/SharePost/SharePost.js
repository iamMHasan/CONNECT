import React from 'react';
import './SharePost.css'
import { BsLink45Deg } from "react-icons/bs";
import Button from '../Button/Button';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Loading from '../loading/Loading';

const SharePost = () => {
    const [loading, setLoading] = useState(false)
    const handleSharePost = (e) => {
        setLoading(true)
        e.preventDefault()
        const text = e.target.text.value 
        const image = e.target.image.files[0]
        
        const formData = new FormData
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
                image : data.data.url
            }
            fetch('http://localhost:5000/posts',{
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
            })
            .catch(err =>{
                console.log(err);
            })
        })
    }
    return (
        <div >
            <h1 className="text-3xl font-semibold text-center p-4">Share your mood now</h1>
            <div>
                <form onSubmit={handleSharePost} className='flex flex-col justify-center items-center'>
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
                    <div className="flex">
                        <label className='py-1 px-2.5 leading-none whitespace-nowrap align-baseline text-xs mr-1  rounded-xl text-white hover:bg-[#672c45] bg-[#94355e]'> <div className="flex items-center"><BsLink45Deg size={20}></BsLink45Deg> Add a image </div>
                            <input name='image' type="file" size="60" />
                        </label>
                        <Button>{loading ? <Loading/> : 'Post'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SharePost;