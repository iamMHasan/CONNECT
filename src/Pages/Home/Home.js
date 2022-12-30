import React from 'react';
import Footer from '../../Component/Footer/Footer';
import Header from '../../Component/Header/Header';
import HowThisWork from '../../Component/HowThisWork/HowThisWork';
import Loading from '../../Component/loading/Loading';
import SharePost from '../../Component/SharePost/SharePost';

const Home = () => {
    return (
        <div>
            <Header/>
            <HowThisWork/>
            <SharePost/>
            <Footer/>
        </div>
    );
};

export default Home;