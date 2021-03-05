import {Container} from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Repolist from "./components/Repository List/Repolist";
import Filters_arr, {LanguageFilter, RepoListItem} from './util/types';
import Filters from './components/Filters/Filters';
import SearchRepos from './components/Search/Search';
import { getRepos, getRequestWithQuery, getRepositoriesSortedByStars } from './util/apiService';
import Header from './components/Layout/Header';



const App:React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [results, setResults] = useState<RepoListItem[]>([]);
  const [filterResults, setFilterResults] = useState<RepoListItem[]>([]);
  const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);
  
  
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
  const searchRepoHandler = (query:string) => {
    getRequestWithQuery(query)
    .then(data => {
      setResults(data.items);
    });
    getRepositoriesSortedByStars(query)
    .then((data) => console.log(data));
    
  }
  
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
  },[results, filters])

  //updates the active property of LanguageFilter Object
  const addFilters = useCallback((allFilters:LanguageFilter[]) => {
    setFilters([...allFilters]);
    filterData();
  }, [filterData])

  


  return (
    <div className="App">
      <Header />
      <Container className="container">
        <SearchRepos searchQuery={searchRepoHandler} />
        <Filters updateFilters={addFilters}/>
        <section>
        <Repolist RepoData={results} Filters={filters} filtered={filterResults}/>
        </section>
      </Container>
    </div>
  );
}

export default App;
