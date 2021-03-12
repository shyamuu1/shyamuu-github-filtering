import axios from "axios";


//get repos the best match query 
export const getRequestWithQuery = async(query:string) => {
    const resp =  await axios.get("https://api.github.com/search/repositories",{
        params:{
            q: query,
            
        }
    });
    const data =  resp.data;
    return data;
}

//general get request returns data based on url
export const getRequest = async(url:string) => {
const resp = await axios.get(url);
const data = resp.data;
return data;
}

//get request that returns data in descending order based on sortType
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

