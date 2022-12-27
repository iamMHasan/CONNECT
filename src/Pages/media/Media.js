import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Post from './Post';
import Loading from '../../Component/loading/Loading';

const Media = () => {
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts')
            const data = await res.json()
            return data;
        }
    })
    return (
        <div className='w-[95%] md:w-[70%] mx-auto flex flex-col gap-3'>
            {
                isLoading ? <Loading /> : (
                    <>
                        {
                            posts.map(post => <Post
                                key={post._id}
                                post={post}
                            />)
                        }
                    </>
                )
            }

        </div>
    );
};

export default Media;