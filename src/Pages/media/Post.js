import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider';

const Post = ({ post }) => {
    const { user } = useContext(AuthContext)
    const { image, text, _id,userName,userPhoto } = post
    return (
        <div className=' bg-[#94355e]/25 rounded-md p-4 text-center'>
            <div className="flex items-center gap-2 my-1">
                <img src={userPhoto} className='w-8 h-8 rounded-full' alt="" />
                <p>{userName}</p>
            </div>
            {
                image && <img src={image} className='w-72 h-48 mx-auto' alt="" />
            }
            {
                text && text.length > 20 ?
                    <h1 className="text-xl">{text.slice(0, 30)} <Link to={`/media/${_id}`}><span className='text-xs text-green-700'>see more...</span></Link></h1>
                    :
                    <h1 className="text-xl">{text}</h1>
            }

        </div>
    );
};

export default Post;
