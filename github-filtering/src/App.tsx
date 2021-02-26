import React, { useEffect, useState } from 'react';
import './App.css';
import { getRepos } from './util/apiService';

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

  return (
    <div className="App">
    </div>
  );
}

export default App;
