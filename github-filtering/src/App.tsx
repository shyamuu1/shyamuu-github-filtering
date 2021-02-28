import { AppBar, Toolbar, Typography, Container} from '@material-ui/core';
import React, { useEffect, useReducer, useState } from 'react';
import {queryReducer} from './util/reducers/queryItemReeducer';
import './App.css';
import Repolist from "./components/Repository List/Repolist";
import {RepoListItem} from './util/types';
import Filters from './components/Filters/Filters';
import SearchRepos from './components/Search/Search';
import { getRepos, getRequestWithQuery } from './util/apiService';


const App:React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [results, setResults] = useState<RepoListItem[]>([]);
  

  console.log(results);
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
    .then((res) => console.log(res));
  }

  const searchRepoHandler = (query:string) => {
    getRequestWithQuery(query)
    .then(data => {
      setResults(data.items);
    });
  }

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
        <Filters />
        <section>
          <Repolist RepoData={results} />
        </section>
      </Container>
    </div>
  );
}

export default App;
