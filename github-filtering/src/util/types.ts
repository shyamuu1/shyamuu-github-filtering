export type Owner = {
node_id:string;
id:number;
login:string;
html_url:string;
avatar_url:string;
followers:number;
following: number;

}
export type RepoListItem = {
    node_id:string;
    name:string;
    description:string;
    language:string;
    stargazers_count:number;
    owner:Owner;
}

export type LanguageFilter = {
    name:string;
    active:boolean;
}


const Filters_arr:LanguageFilter[] = [
    {name: "Java", active:false},
    {name: "Python", active:false},
    {name: "JavaScript", active:false},
    {name: "TypeScript", active:false}
]

export interface RepoItemSetAction {
    type:"SET",
    repoItems:RepoListItem[]
}

export type RepoItemActionType = RepoItemSetAction;
export default Filters_arr;