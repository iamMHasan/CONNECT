import React from 'react';

const Loading = () => {
    return (
        <div class="relative w-6 h-6 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full border-2 border-white"></div>
        </div>
    );
};

export default Loading;