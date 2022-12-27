import React from 'react';
import {createUserWithEmailAndPassword, getAuth,GoogleAuthProvider , onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase.config';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    console.log(user);
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () =>{
        setLoading(true)
       return signInWithPopup(auth, googleProvider)
    }
    const updateUserProfile = (name, userType) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
          displayName: name,
          userType: userType,
        })
      }
    const logOut = () =>{
        return signOut(auth)
    }
    useEffect(()=>{
      const unsubscribed = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribed()
    },[])

    const userInfo = {
        createUser,
        signInUser,
        googleLogin,
        user,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={userInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;