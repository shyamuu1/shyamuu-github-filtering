import { AppBar, Toolbar, Typography, Container} from '@material-ui/core';
import React, { useEffect, useReducer, useState, useCallback } from 'react';
import {queryReducer} from './util/reducers/queryItemReeducer';
import './App.css';
import Repolist from "./components/Repository List/Repolist";
import Filters_arr, {LanguageFilter, RepoListItem} from './util/types';
import Filters from './components/Filters/Filters';
import SearchRepos from './components/Search/Search';
import { getRepos, getRequestWithQuery } from './util/apiService';


const App:React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [results, setResults] = useState<RepoListItem[]>([]);
  const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);
  
  console.log(filters);
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
    
  }, [isMounted]);


  //Gets all repositories 
  const getRepoData = () => {
    getRepos()
    .then((res) => {
      setResults(res.items);
    });
  }

  const searchRepoHandler = (query:string) => {
    getRequestWithQuery(query)
    .then(data => {
      console.log(data.items);
      setResults(data.items);
    });
    
  }
  const filterData = useCallback(() => {
    const activeFilters = filters.filter((f) => f.active === true);
    activeFilters.forEach((f) => {
      const filtered_results = results.filter((repos) => repos.language === f.name);
      setResults([...filtered_results])
    })
  },[results, filters])

  const addFilters = useCallback((activeFilters:LanguageFilter[]) => {
    setFilters([...activeFilters]);
    filterData();
  }, [filterData])

  
  
  let repoList = (results.length)?<Repolist RepoData={results}/>:<Typography paragraph>No Results from search</Typography>;
  


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Repo Query
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="container">
        <SearchRepos searchQuery={searchRepoHandler} />
        <Filters activeFilters={addFilters}/>
        <section>
          {repoList}
        </section>
      </Container>
    </div>
  );
}

export default App;
