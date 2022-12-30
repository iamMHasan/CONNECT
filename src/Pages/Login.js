import React, { useState } from 'react';
import { useContext } from 'react';
import { Link , useLocation, useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Loading from '../Component/loading/Loading';
import { AuthContext } from '../Context/AuthProvider';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const {signInUser ,googleLogin} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || '/'
    const handleLogin = e => {
        setLoading(true)
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        signInUser(email, password)
        .then(result =>{
            const user = result.user 
            console.log(user);
            setLoading(false)
            form.reset()
            toast.success('login successfull')
            navigate(from, { replace: true })
        })
        .catch(err =>{
            console.log(err);
            setLoading(false)
            setError(err.message)
        })
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user
                console.log(user);
                setLoading(false)
                toast.success('user created')
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }
    return (
        <section className="h-screen w-[95%] mx-auto">
            <div className="px-6 h-full text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                    <div
                        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                    >
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample"
                        />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="text-lg mb-0 mr-4">Sign in with</p>
                                <button
                                onClick={handleGoogleLogin}
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className=" p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700  mx-1"
                                >

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-5 h-5"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                                </button>
                            </div>

                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0">Or</p>
                            </div>


                            <div className="mb-6">
                                <input
                                    name='email'
                                    type="email"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    
                                    placeholder="Email address"
                                />
                            </div>


                            <div className="mb-6">
                                <input
                                    name='password'
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    
                                    placeholder="Password"
                                />
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                   {
                                    loading ? <Loading/> : ' Login'
                                   }
                                </button>
                                <p>{error}</p>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <Link
                                        to="/signup"
                                        className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                    >Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;