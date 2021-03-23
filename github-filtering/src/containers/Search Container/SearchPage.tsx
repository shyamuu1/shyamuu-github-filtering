import React, {useState, useEffect, useCallback, useContext} from 'react';
import Loader from "../../UI/Spinner/Loader";
import {useHistory}from "react-router-dom";
import {  getRequestWithQuery } from "../../util/apiService";
import  {RepoListItem, LanguageFilter} from "../../util/types";
import {Container} from '@material-ui/core';
import SearchRepos from "../../components/Search/Search";
import Filters from "../../components/Filters/Filters";
import Repolist from "../../components/Repository List/Repolist";
import { OwnerContext } from '../../context/owner-context';
import ToggleSort from '../../components/Toggle Sort/ToggleSort';




const SearchPage:React.FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [results, setResults] = useState<RepoListItem[]>([]);
    const [filters, setFilters] = useState<LanguageFilter[]>([]);
    const [searching, setSearching] = useState<boolean>(false);
    const history = useHistory();
    const { query, setCurrentQuery, setCurrentLogin} = useContext(OwnerContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSorted, setSorted] = useState(false);
    const [error, setError] = useState("");
    

  useEffect(() => {
    try{
      if(isMounted && (query !== "")){
        searchRepoHandler(query)
      }else{
        return () => {
          setIsMounted(false);
        }
      }

    }catch(err){
      setError(err.message);
      console.log(err.message);

    }
    
  }, [isMounted, query]);

  //queries the Github search API
  const searchRepoHandler = (queryVal:string) => {
    setCurrentQuery(queryVal);
    setIsLoading(true);
    getRequestWithQuery(queryVal)
    .then(data => {
      setSearching(true);
      setResults(data.items);
    });
    setIsLoading(false);
    
  };
  //retrieves toggle switch's boolean status which is used to sort data or not
  const ToggleSortHandler = (activateSort:boolean) => {
    setSorted(activateSort);
  }
  //update filters arr 
  const addFilters = useCallback((allFilters:LanguageFilter[]) => {
    setFilters([...allFilters]);
  },[]);

//gets current username and shares it with detail page
  const selectRepoItemHandler = useCallback((selectedRepo:RepoListItem) => {
    setCurrentLogin(selectedRepo.owner.login); 
    history.push("detail");
    
  },[history, setCurrentLogin]);

  //checks if list is still loading and returns a loading animation otherwise displays a list
  let repoList = (isLoading)?<Loader />:<Repolist RepoData={results}  Filters={filters}  sort={isSorted} clicked={selectRepoItemHandler}/>;
  let content = (error)?<p>{error}</p>:repoList;
    return(
        <Container className="container">
        <SearchRepos searchQuery={searchRepoHandler} />
        <Filters updateFilters={addFilters} active={searching}/>
        <ToggleSort sorted={ToggleSortHandler} active={searching}/>
        <section>
        {content}
        </section>
      </Container>
    );
}

export default SearchPage;