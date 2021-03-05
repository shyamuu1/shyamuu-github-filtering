import React, {useState, useEffect, useCallback} from 'react';
import { getRepos, getRequestWithQuery, getRepositoriesSortedByStars } from "../../util/apiService";
import Filters_arr, {RepoListItem, LanguageFilter} from "../../util/types";
import {Container} from '@material-ui/core';
import SearchRepos from "../../components/Search/Search";
import Filters from "../../components/Filters/Filters";
import Repolist from "../../components/Repository List/Repolist";

const SearchPage:React.FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [queryStr, setQuery] = useState<string>("");
    const [results, setResults] = useState<RepoListItem[]>([]);
    const [filterResults, setFilterResults] = useState<RepoListItem[]>([]);
    const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);

    console.log(results)
  //Gets all repositories 
  const getRepoData = useCallback(() => {
    getRepos()
    .then((res) => {
      setResults(res.items);
    });
  },[]);

  useEffect(() => {
    try{
      if(isMounted){
        getRepoData();
        
      }else{
        return () => {
          setIsMounted(false);
        }
      }

    }catch(err){
      console.log(err.message);

    }
    
  }, [isMounted, getRepoData]);

  //queries the Github search API
  const searchRepoHandler = useCallback((query:string) => {
    setQuery(query);
    getRequestWithQuery(query)
    .then(data => {
      setResults(data.items);
    });
    
  },[]);

  const sortRepositoriesHandler = useCallback(() => {
    try{
      getRepositoriesSortedByStars(queryStr)
    .then((data) => {
      setResults(data.items);
      console.log(data.items);
    })

    }catch(err){
      console.log(err.message)

    }
  }, [queryStr])

   //filters data by with active filters
   const filterData = useCallback(() => {
    const activeFilters = filters.filter((f) => f.active === true);
    if(activeFilters.length){
    activeFilters.forEach((f) => {
      const filtered_results = results.filter((repos) => repos.language === f.name);
      setFilterResults([...filtered_results])
    })
  }else{
    setFilterResults(results);
  }
  },[results, filters]);

  const addFilters = useCallback((allFilters:LanguageFilter[]) => {
    setFilters([...allFilters]);
    filterData();
  }, [filterData]);

    return(
        <Container className="container">
        <SearchRepos searchQuery={searchRepoHandler} />
        <Filters updateFilters={addFilters}/>
        <section>
        <Repolist RepoData={results} Filters={filters} filtered={filterResults}/>
        </section>
      </Container>
    );
}

export default SearchPage;