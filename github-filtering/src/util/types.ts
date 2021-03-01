export type RepoListItem = {
    node_id:string;
    name:string;
    description:string;
    language:string;
    stargazers_count:number;
    owner:{
        login:string;
    }
}

export type LanguageFilter = {
    name:string;
    active:boolean;
}

export interface RepoItemSetAction {
    type:"SET",
    repoItems:RepoListItem[]
}

export type RepoItemActionType = RepoItemSetAction;