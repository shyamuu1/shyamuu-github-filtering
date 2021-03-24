import {useState} from "react";
import {getRequestWithQuery} from "../util/apiService";
import {RepoListItem} from "../util/types";

export const useRepo = () => {
    const [results, setResults] = useState<RepoListItem[]>([]);
    const [searching, setSearching] = useState<boolean>(false);
    const searchRepos = (query:string) => {
        getRequestWithQuery(query)
        .then((data) => {
            setSearching(true);
            setResults(data.items);
        });
    }
    return {
        results,
        searchRepos,
        searching
    }
}