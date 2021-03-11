import React, {useState, useEffect, useCallback, useContext} from 'react';
import Loader from "../../UI/Spinner/Loader";
import {useHistory}from "react-router-dom";
import { getRepos, getRequestWithQuery, getRepositoriesSortedByStars } from "../../util/apiService";
import Filters_arr, {RepoListItem, LanguageFilter} from "../../util/types";
import {Container} from '@material-ui/core';
import SearchRepos from "../../components/Search/Search";
import Filters from "../../components/Filters/Filters";
import Repolist from "../../components/Repository List/Repolist";
import ToggleSort from "../../components/Toggle Sort/ToggleSort";
import { OwnerContext } from '../../context/owner-context';


const SearchPage:React.FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [queryStr, setQuery] = useState<string>("");
    const [results, setResults] = useState<RepoListItem[]>([]);
    const [filterResults, setFilterResults] = useState<RepoListItem[]>([]);
    const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);
    const history = useHistory();
    const { setCurrentOwnerId} = useContext(OwnerContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sorted_repos, setSortedRepos] = useState<RepoListItem[]>([]);
    

    console.log(results)
    console.log(queryStr)
  //Gets all repositories 
  const getRepoData = useCallback(() => {
    setIsLoading(true);
    getRepos()
    .then((res) => {
      setIsLoading(false);
      setResults(res.items);
    });
  },[]);

  useEffect(() => {
    try{
      if(isMounted && (queryStr !== "")){
        searchRepoHandler(queryStr)
        getSortedRepos();
      }else{
        return () => {
          setIsMounted(false);
        }
      }

    }catch(err){
      console.log(err.message);

    }
    
  }, [isMounted, queryStr]);

  //queries the Github search API
  const searchRepoHandler = useCallback((query:string) => {
    setQuery(query);
    setIsLoading(true);
    getRequestWithQuery(query)
    .then(data => {
      setIsLoading(false);
      setResults(data.items);
    });
    
  },[]);
  

  const getSortedRepos = useCallback(() => {
    try{
      
      setIsLoading(true);
      getRepositoriesSortedByStars(queryStr)
    .then((data) => {
      setIsLoading(false);
      setSortedRepos(data.items);
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

  const ToggleSortHandler = (isSorted:boolean) => {
    console.log(isSorted);
    if(isSorted){
      setResults(sorted_repos)
    }

  }
  const addFilters = useCallback((allFilters:LanguageFilter[]) => {
    setFilters([...allFilters]);
    filterData();
  }, [filterData]);

  const selectRepoItemHandler = useCallback((selectedRepo:RepoListItem) => {
    setCurrentOwnerId(selectedRepo.owner.login); 
    history.push("detail");
    
  },[history, setCurrentOwnerId]);

  let repoList = (isLoading)?<Loader />:<Repolist RepoData={results} Filters={filters} filtered={filterResults} clicked={selectRepoItemHandler}/>;

    return(
        <Container className="container">
        <SearchRepos searchQuery={searchRepoHandler} />
        <Filters updateFilters={addFilters}/>
        <ToggleSort sorted={ToggleSortHandler}/>
        <section>
        {repoList}
        </section>
      </Container>
    );
}

export default SearchPage;