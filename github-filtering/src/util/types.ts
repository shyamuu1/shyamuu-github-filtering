export type RepoListItem = {
    node_id:string;
    name:string;
    description:string;
    language:string;
    star_gazerscount:string;
    owner:{
        login:string;
    }
}

export interface RepoItemSetAction {
    type:"SET",
    repoItems:RepoListItem[]
}

export type RepoItemActionType = RepoItemSetAction;