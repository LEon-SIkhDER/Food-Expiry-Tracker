import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            return JSON.parse(storedUser)
        }
        else{ return null}
    })
    console.log(user)

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            if(currentUser){
                localStorage.setItem("user", JSON.stringify(currentUser))
            }
            else{
                localStorage.removeItem("user")
            }

        })
        return ()=> unSubscribe()
    },[])


    

    const contexts = {
        user,
    }

    return <AuthContext value={contexts}>{children}</AuthContext>
};

export default AuthProvider;