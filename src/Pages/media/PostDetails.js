import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router-dom'

const PostDetails = () => {
    const PostDetails = useLoaderData()
    console.log(PostDetails);
    const { image, text, _id, userName, userPhoto } = PostDetails
    return (
        <div className=' bg-black/5 rounded-md p-4 text-center w-[95%] md:w-[70%] mx-auto'>
            <div className="flex items-center gap-2 my-1">
                <img src={userPhoto} className='w-8 h-8 rounded-full' alt="" />
                <p>{userName}</p>
            </div>
            {
                image && <img src={image} className='w-72 h-48 mx-auto' alt="" />
            }
            {<h1 className="text-xl">{text}</h1>}
        </div>
    );
};

export default PostDetails;