import React, {useState, useEffect, useCallback, useContext} from 'react';
import Loader from "../../UI/Spinner/Loader";
import {useHistory}from "react-router-dom";
import { getRepos, getRequestWithQuery, getRepositoriesSortedByStars } from "../../util/apiService";
import Filters_arr, {RepoListItem, LanguageFilter, Owner} from "../../util/types";
import {Container} from '@material-ui/core';
import SearchRepos from "../../components/Search/Search";
import Filters from "../../components/Filters/Filters";
import Repolist from "../../components/Repository List/Repolist";
import { OwnerContext } from '../../context/owner-context';


const SearchPage:React.FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [queryStr, setQuery] = useState<string>("");
    const [results, setResults] = useState<RepoListItem[]>([]);
    const [filterResults, setFilterResults] = useState<RepoListItem[]>([]);
    const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);
    const history = useHistory();
    const {ownerId, star_count, setCurrentOwnerId, setStars} = useContext(OwnerContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    console.log(results)
    console.log(ownerId)
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
    //setQuery(query);
    setIsLoading(true);
    getRequestWithQuery(query)
    .then(data => {
      setIsLoading(false);
      setResults(data.items);
    });
    
  },[]);

  const sortRepositoriesHandler = useCallback(() => {
    try{
      setIsLoading(true);
      getRepositoriesSortedByStars(queryStr)
    .then((data) => {
      setIsLoading(false);
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

  const selectRepoItemHandler = useCallback((selectedRepo:RepoListItem) => {
    setCurrentOwnerId(selectedRepo.owner.login);
    setStars(selectedRepo.stargazers_count);
    
    history.push("detail");
    
  },[history, setCurrentOwnerId, setStars]);

  let repoList = (isLoading)?<Loader />:<Repolist RepoData={results} Filters={filters} filtered={filterResults} clicked={selectRepoItemHandler}/>;

    return(
        <Container className="container">
        <SearchRepos searchQuery={searchRepoHandler} />
        <Filters updateFilters={addFilters}/>
        <section>
        {repoList}
        </section>
      </Container>
    );
}

export default SearchPage;