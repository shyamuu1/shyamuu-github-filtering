import { Button, Container, Divider, Typography } from '@material-ui/core';
import React, { useContext, useEffect,useState,useCallback} from 'react';
import { OwnerContext } from '../../context/owner-context';
import {Userlist, UserDetail} from '../../components';
import Loader from "../../UI/Spinner/Loader";
import Organizations from '../../components/Organizations/Organizations';
import { useHistory } from 'react-router';
import {useRepo, useOwner} from "../../hooks";
import "./SearchDetailPage.css";



const SearchDetailPage:React.FC = () => {
    const {loginName} = useContext(OwnerContext);
    const {user, getUserByUsername} = useOwner();
    const {orgs, getOrgs, topRepos, getUserTopRepos} = useRepo();
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    
    
    
    // gets orgnaizations affiliated with user
    const getOrganizations = useCallback(() => {
        setIsLoading(true);
         getOrgs(loginName);
        setIsLoading(false);
    }, [loginName, getOrgs])

    //get user by loginName or username
    const getUser = useCallback(() => {
        setIsLoading(true);
        getUserByUsername(loginName);
        setIsLoading(false);
    },[loginName, getUserByUsername])


    //gets repos affiliated with current user
    const getUsersRepos = useCallback(() => {
        setIsLoading(true);
        getUserTopRepos(loginName);
        setIsLoading(false);
    },[loginName, getUserTopRepos])

    


    useEffect(() => {
        try{
            if(isMounted){
                getUser();
                getUsersRepos();
                getOrganizations();
            }else{
                return () => {setIsMounted(false)};
            }
        }catch(err){
            setError(err);
            console.log(err.message);
        }
    },[ isMounted])

    const goBackButtonHandler = () => {
        history.goBack();
    }
    
    let userFragment = (!isLoading && !error)? (
        <React.Fragment>
            <UserDetail currentOwner={user}/>
            <section className="OrgsandRepoCount">
            <Typography variant="h6">Organizations</Typography>
            <Divider />
            <Organizations orgs={orgs} />
            <Userlist repos={topRepos}/>
            </section>
        </React.Fragment>
    ):<Loader />
    return(
        <section>
        <Container className="searchDetailContent">
            {userFragment}
            <div className="BackButton">
            <Button style={{maxWidth:"300px"}} fullWidth variant="outlined" color="primary" onClick={goBackButtonHandler} >Go Back to Seach</Button>
            </div>
        </Container>  
        </section>
    );
}

export default SearchDetailPage;