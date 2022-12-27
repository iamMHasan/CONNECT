import React from 'react';

const Button = ({children}) => {
    return (
       <button className='rounded-xl inline-block px-6 py-2.5 hover:bg-[#672c45] bg-[#94355e] text-white font-medium text-xs leading-tight uppercase  shadow-md hover:shadow-lg focus:[#672c45 focus:shadow-lg focus:outline-none focus:ring-0 active:[#672c45 active:shadow-lg transition duration-150 ease-in-out'>{children}</button>
    );
};

export default Button;