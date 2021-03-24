import {useState} from "react";
import {getRequest, getRequestWithQuery, getSortRequest} from "../util/apiService";
import {Orgs, RepoListItem} from "../util/types";


export const useRepo = () => {
    const [results, setResults] = useState<RepoListItem[]>([]);
    const [searching, setSearching] = useState<boolean>(false);
    const [orgs, setOrgs] = useState<Orgs[]>([]);
    const [topRepos, setTopRepos] = useState<RepoListItem[]>([]);

    const searchRepos = (query:string) => {
        getRequestWithQuery(query)
        .then((data) => {
            setSearching(true);
            setResults(data.items);
        });
    }
    const getOrgs = (username:string) => {
        const orgs_url:string = `https://api.github.com/users/${username}/orgs`;
        getRequest(orgs_url)
        .then((res) => {
            setOrgs(res);
        });
    
    
    }

    const getUserTopRepos = (username:string) => {
        const userRepos_url:string = `https://api.github.com/users/${username}/repos`;
        getSortRequest(userRepos_url, "stars")
        .then((data) => {
            setTopRepos(data);
        });
    }

    return {
        results,
        searchRepos,
        searching,
        orgs,
        getOrgs,
        topRepos,
        getUserTopRepos


    }
}