import React from 'react';
import banner from '../../assets/banner.jpg'

const Header = () => {
    return (
        <div style={{
            backgroundImage: ` linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(117, 19, 93, 0.73)), url(${banner})`
        }}
            className='h-[80vh] md:h-screen flex justify-center items-center text-white'
        >
            <h1 data-aos="fade-up"
                className="text-4xl p-5 hover:scale-105 transition duration-100">
                CONNECT with the people you love!</h1>
        </div>
    );
};

export default Header;