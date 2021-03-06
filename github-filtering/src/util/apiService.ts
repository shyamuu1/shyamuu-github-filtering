import axios from "axios";



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

export const getUsersByQuery = async(query:string) => {
    const resp = await axios.get("https://api.github.com/search/users", {
        params:{
            q:query
        }
    });
    const data = resp.data;
    return data;
}

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