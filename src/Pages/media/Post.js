import React from 'react';
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    console.log(post);
    const { image, text } = post
    return (
        <div className='bg-white/70 p-4 text-center'>
            {
                image && <img src={image} className='w-72 h-48 mx-auto' alt="" />
            }
            {
                text && text.length > 20 ?
                    <h1 className="text-xl">{text.slice(0, 30)} <Link><span className='text-xs'>see more...</span></Link></h1>
                    :
                    <h1 className="text-xl">{text}</h1>
            }

        </div>
    );
};

export default Post;