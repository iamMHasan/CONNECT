import React from 'react';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider';
import { AiFillLike } from "react-icons/ai";
import { useUserAbout } from '../../api/useAbout';
import toast from 'react-hot-toast';
import Lottie from "lottie-react";
import like from '../../animation/like.json'
import { useEffect } from 'react';
import Loading from '../../Component/loading/Loading';

const Post = ({ post }) => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const { image, text, _id, userName, userPhoto } = post
    const [userInfo] = useUserAbout(user?.email)
    const [comment, setComment] = useState([])

    // like lottie
    const options = {
        animationData: like,
        loop: true
    };

    useEffect(() => {
        fetch(`https://connect-server-gamma.vercel.app/comment?id=${_id}`)
            .then(res => res.json())
            .then(data => setComment(data))
            .catch(err => {
                console.log(err);
            })
    }, [comment, _id])
    // comment form
    const handleComment = e => {
        setLoading(true)
        e.preventDefault()
        const comment = e.target.comment.value
        const userComment = {
            comment,
            postId: _id,
            userName,
            like: 0
        }

        fetch(`https://connect-server-gamma.vercel.app/comment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('comment added')
                setLoading(false)
                e.target.reset()
            })
            .catch(err => {
                console.log(err);
            })
    }
    // add likes 
    const handleLikes = () => {
        const userLike = {
            like: 0
        }
        fetch(`https://connect-server-gamma.vercel.app/comment/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userLike)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className=' bg-black/5 rounded-md p-4 text-center'>
            <div className="flex items-center justify-between gap-2 my-1">
                <div className='flex justify-center items-center gap-3'>
                    <img src={userPhoto} className='w-8 h-8 rounded-full' alt="pic" />
                    <p>{userName}</p>
                </div>
                <div className="flex justify-center items-center gap-3">
                    {
                        comment.map(comm => (
                            <>
                                <p>{comm.like}</p>
                            </>
                        ))
                    }
                    <div className='w-10 h-10'>
                        <Lottie className='cursor-pointer' onClick={handleLikes} animationData={like} loop={true} />
                    </div>
                </div>
            </div>
            <div className=''>
                {
                    image && <img src={image} className='w-72 h-48 mx-auto' alt="" />
                }
                {
                    text && text.length > 20 ?
                        <h1 className="text-xl mt-4">{text.slice(0, 50)} <Link to={`/media/${_id}`}><span className='text-xs text-green-700'>see more...</span></Link></h1>
                        :
                        <h1 className="text-xl">{text}</h1>
                }
            </div>
            <div className=' text-white mt-6 rounded'>
                {
                    comment && comment.map(com => (
                        <div className="flex justify-center items-center bg-black/20 p-1 mt-1">
                            <p className='w-2/12 text-xs text-black'>{com?.userName}</p>
                            <p className='flex-1  '>{com?.comment}</p>
                        </div>
                    ))
                }
            </div>

            <form onSubmit={handleComment} className="form flex mt-2 gap-2">
                <input type="text" className="form-control block
                            w-2/3
                            mx-auto
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
                    name='comment'
                    placeholder='Add a comment' />
                {
                    user?.uid ? <button className="btn inline-block px-6 flex-1 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">{loading ? <Loading /> : 'Post Comment'}</button> : <Link to='/login'>
                        <button className="btn inline-block px-6 flex-1 py-2.5 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">login to comment</button>
                    </Link>
                }
            </form>
        </div>
    );
};

export default Post;
