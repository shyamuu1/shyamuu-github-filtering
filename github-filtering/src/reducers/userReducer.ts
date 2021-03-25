import { Owner } from "../util/types";

const default_Owner:Owner = {
    node_id: "",
    id: 0,
    login: "",
    bio:"",
    html_url: "",
    avatar_url: "",
    followers: 0,
    following: 0
}

export interface SET_USER {
    type:"SET";
    user: any;
}

export type USER_ACTIONTYPE = SET_USER;

export const userReducer = (current_user:Owner = default_Owner, action:USER_ACTIONTYPE) => {
    switch(action.type){
        case "SET":
            return {...current_user,
                node_id:action.user.node_id,
                id: action.user.id,
                login: action.user.login,
                bio: action.user.bio,
                html_url:action.user.html_url,
                avatar_url:action.user.avatar_url,
                followers: action.user.followers,
                following:action.user.following
            };
        default:
            return current_user;

    }

};

export default default_Owner;