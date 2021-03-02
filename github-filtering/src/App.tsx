import { AppBar, Toolbar, Typography, Container} from '@material-ui/core';
import React, { useEffect, useReducer, useState, useCallback } from 'react';
import {queryReducer} from './util/reducers/queryItemReeducer';
import './App.css';
import Repolist from "./components/Repository List/Repolist";
import Filters_arr, {LanguageFilter, RepoListItem} from './util/types';
import Filters from './components/Filters/Filters';
import SearchRepos from './components/Search/Search';
import { getRepos, getRequestWithQuery } from './util/apiService';
import Header from './components/Layout/Header';



const App:React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [results, setResults] = useState<RepoListItem[]>([]);
  const [filterResults, setFilterResults] = useState<RepoListItem[]>([]);
  const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);
  
  console.log(filters);

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


  

  const searchRepoHandler = (query:string) => {
    getRequestWithQuery(query)
    .then(data => {
      console.log(data.items);
      setResults(data.items);
    });
    
  }
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

  const addFilters = useCallback((allFilters:LanguageFilter[]) => {
    setFilters([...allFilters]);
    filterData();
  }, [filterData])

  


  return (
    <div className="App">
      <Header />
      <Container className="container">
        <SearchRepos searchQuery={searchRepoHandler} />
        <Filters activeFilters={addFilters}/>
        <section>
        <Repolist RepoData={results} Filters={filters} filtered={filterResults}/>
        </section>
      </Container>
    </div>
  );
}

export default App;
