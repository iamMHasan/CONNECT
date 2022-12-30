import React from 'react';

const TextStyle = ({children}) => {
    return (
        <div>
             <h1 className="text-3xl text-[#94355e] hover:scale-105 transition duration-100 font-semibold text-center p-4 ">{children}</h1>
        </div>
    );
};

export default TextStyle;