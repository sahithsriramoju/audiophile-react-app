import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signOutAsync } from "../redux/authSlice";
import type { AppDispatch } from "../redux/appStore";

export const UserProfile = () => {
   const {error, loading, step, user} = useSelector(selectAuth);
   const dispatch = useDispatch<AppDispatch>();
   
   const handleSignOut = () => {
      // Dispatch sign out action
      dispatch(signOutAsync());
   }
   return(
      <div>
         <h1>User Profile</h1>
         {loading && <p>Loading...</p>}
         {error && <p className="text-red-500">Error: {error}</p>}
         {step === 'SIGNED_IN' && user && (
            <div>
               <p>UserId: {user.userId}</p>
               <p>Email: {user.username}</p>
            </div>
         )}
         <button onClick={handleSignOut}>SignOut</button>
      </div>
   )
}