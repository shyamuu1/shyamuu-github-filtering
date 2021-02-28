import { AppBar, Toolbar, Typography, Container} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import SearchRepos from './components/Search/Search';
import { getRepos, getRequestWithQuery } from './util/apiService';

const App:React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(true);
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
    .then(res => console.log(res));
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
      </Container>
    </div>
  );
}

export default App;
