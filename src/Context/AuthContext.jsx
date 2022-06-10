import { useEffect, createContext, useContext, useState } from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../firebase/firebaseConfig";
import Loading from "../components/Loading";
const User = createContext();
function AuthContext({children}) {
    const [ user, SetUser] = useState("");
    const [loading, SetLoading] = useState(true)
    const createUserWithEmail = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    };
    const signInWithEmail = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    };

    const logOut = () => {
        return signOut(auth)
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            SetUser(user);
            SetLoading(false);
          });
    }, []);

    if(loading) {
        return <Loading/>
    }

    return (
        <User.Provider value={{signInWithEmail,createUserWithEmail,logOut,user, loading}}>
            {children}
        </User.Provider>
    )

}

export default AuthContext;

export const UserAuth = () => {
    return useContext(User)
}