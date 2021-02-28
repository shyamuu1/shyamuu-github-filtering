import { RepoItemActionType, RepoItemSetAction, RepoListItem } from "../types";

export const  queryReducer = (current_data:RepoListItem[], action:RepoItemActionType) => {
    switch(action.type){
        case "SET":
            return action.repoItems;
        default:
            return current_data;
    }
}