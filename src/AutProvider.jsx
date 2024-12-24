import React, { createContext, useContext, useEffect, useState } from 'react';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from './firebase.init';


export const authContext=createContext()
export const useAuth=()=> useContext(authContext)

const AutProvider = ({routes}) => {
    const[user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)
    const googleProvider=new GoogleAuthProvider
    const handelRegister =(email,password)=>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const handelLogin =(email,password)=>{
        setLoading(true);
       return signInWithEmailAndPassword(auth,email,password)
    }
    const handeLogout =()=>{
        setLoading(true);
        return signOut(auth);
    }
    const handelGoogleLogin =()=>{
        setLoading(true);
       return signInWithPopup(auth,googleProvider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
    
        return () => unsubscribe();
      }, []);

    const authinfo={
        user,
        setUser,
        loading,
        setLoading,
        handelRegister,
        handelLogin,
        handelGoogleLogin,
        handeLogout,
    }
   
    return (
        <div>
            <authContext.Provider value={authinfo}>{routes}</authContext.Provider>
        </div>
    );
};

export default AutProvider;