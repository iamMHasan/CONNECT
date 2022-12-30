import React from 'react';
import Lottie from "lottie-react";
import register from '../../animation/register.json'
import about from '../../animation/about.json'
import post from '../../animation/post.json'
import TextStyle from '../text/TextStyle';

const HowThisWork = () => {
    const options = {
        animationData: register,
        loop: true
    };
    const options2 = {
        animationData: about,
        loop: true,
    };
    const options3 = {
        animationData: post,
        loop: true,
    };

    return (
        <div className='w-[95%] mx-auto mt-10  text-center'>
            <TextStyle>How to start? </TextStyle>
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col justify-center items-center mr-3">
                    <div className='w-48 h-48'>
                        <Lottie animationData={register} loop={true} />
                    </div>
                    <h1 className="text-xl font-semibold">Register an Free account</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="h-48 w-48">
                        <Lottie animationData={about} loop={true} />
                    </div>
                    <h1 className="text-xl font-semibold">Setup your profiel</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="h-48 w-48">
                        <Lottie animationData={post} loop={true} />
                    </div>
                    <h1 className="text-xl font-semibold">Start posting! Hurrah!</h1>
                </div>
            </div>
        </div>
    );
};

export default HowThisWork;