import axios from "axios";


//get all repositories using axios
export const getRequestWithQuery = async(query:string) => {
    const resp =  await axios.get("https://api.github.com/search/repositories",{
        params:{
            q: query,
            
        }
    });
    const data =  resp.data;
    return data;
}

export const getRepos = async() => {
    const resp = await fetch("https://api.github.com/search/repositories?q=q", {
        method:"GET",
        headers: {
            "Accept":"application/vnd.github.v3+json"
        }
    });
    const data = resp.json();
    return data;
}
//get Users relates to query
export const getUsersByQuery = async(query:string) => {
    const resp = await axios.get("https://api.github.com/search/users", {
        params:{
            q:query
        }
    });
    const data = resp.data;
    return data;
}
//get repos sorted by stars
export const getRepositoriesSortedByStars = async(query:string) => {
    const resp = await axios.get("https://api.github.com/search/repositories", {
        params:{
            order:"desc",
            q:query,
            sort: "stars",
            
        }
    });
    const data = resp.data;
    return data;
}

export const getRequest = async(url:string) => {
const resp = await axios.get(url);
const data = resp.data;
return data;
}

export const getSortRequest = async(url:string, sortType:string) => {
    const resp = await axios.get(url,{
        params:{
            order:"desc",
            sort:sortType
        }
    });
    const data = resp.data;
    return data;
}

export const getQuerySortRequest = async(url:string, query:string, sortType:string) => {
    const resp = await axios.get(url,{
        params:{
            q:"language:"+query,
            order:"desc",
            sort:sortType
        }
    });
    const data = resp.data;
    return data;
}