import {useState,useEffect} from 'react'
import { auth, signOut } from "./Google_login/firebase";
import Login from "./Google_login/Login";


const Google_login = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe(); 
    }, []);

    const handleLogout = () => {
        signOut(auth).then(() => setUser(null));
    };
  return (
    <>
    {user ? (
                <div>
                    <h2>Welcome, {user.displayName}</h2>
                    <button onClick={handleLogout}>Logout</button>
                    <img src={user.photoURL} alt="Profile" />
                    <h3>Email: {user.email}</h3>
                </div>
            ) : (
                <Login setUser={setUser} />
            )}
    
    </>
  )
}

export default Google_login