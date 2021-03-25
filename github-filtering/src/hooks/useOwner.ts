import {useReducer} from "react";
import {getRequest} from "../util/apiService";
import default_Owner, {userReducer} from "../reducers/userReducer";


export const useOwner = () => {
    const [user, dispatchUser] = useReducer(userReducer, default_Owner);

    const getUserByUsername = (username:string) => {
        const user_url:string = `https://api.github.com/users/${username}`;
        getRequest(user_url)
        .then((res) => dispatchUser({type:"SET", user:res}))
    }
    return {
        user,
        getUserByUsername
    }
}