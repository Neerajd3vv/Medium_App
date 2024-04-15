import {  Dispatch, SetStateAction, createContext } from "react";

interface UserAuthContextType {
    userAuthentication: boolean;
    setUserAuthentication: Dispatch<SetStateAction<boolean>>;
}


const UserAuthContext  = createContext<UserAuthContextType >({
    userAuthentication: false,
    setUserAuthentication: () => {}
})

export default UserAuthContext