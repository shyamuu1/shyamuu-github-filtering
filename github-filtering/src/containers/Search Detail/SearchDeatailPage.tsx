import { Button, Container, Divider, Typography } from '@material-ui/core';
import React, { useContext, useEffect,useState,useCallback } from 'react';
import { OwnerContext } from '../../context/owner-context';
import { getRequest, getSortRequest} from '../../util/apiService';
import { Owner, RepoListItem, Orgs } from '../../util/types';
import {Userlist, UserDetail} from '../../components';
import Loader from "../../UI/Spinner/Loader";
import Organizations from '../../components/Organizations/Organizations';
import { useHistory } from 'react-router';
import {useRepo} from "../../hooks/useRepo";
import "./SearchDetailPage.css";

const default_Owner:Owner = {
    node_id: "",
    id: 0,
    login: "",
    bio:"",
    html_url: "",
    avatar_url: "",
    followers: 0,
    following: 0
}

const SearchDetailPage:React.FC = () => {
    const {loginName} = useContext(OwnerContext);
    const [user, setUser] = useState<Owner>(default_Owner);
    const {orgs, getOrgs, topRepos, getUserTopRepos} = useRepo();
    //const [followers, setFollowers] = useState<RepoListItem[]>([]);
    //const [orgs, setOrgs] = useState<Orgs[]>([]);
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    
    console.log(user);
    
    // gets orgnaizations affiliated with user
    const getOrganizations = useCallback(() => {
        //const orgs_url:string = `https://api.github.com/users/${loginName}/orgs`;
        setIsLoading(true);
         getOrgs(loginName);
        // getRequest(orgs_url)
        // .then((res) =>  {
            
        //     setOrgs(res);
        // })
        setIsLoading(false);
    }, [loginName, getOrgs])

    //get user by loginName or username
    const getUser = useCallback(() => {
        let user_url:string = `https://api.github.com/users/${loginName}`
        setIsLoading(true);
        getRequest(user_url)
        .then((res) => {
            
            setUser((currentState) => {
                return {
                    ...currentState,
                    node_id:res.node_id,
                    id:res.id,
                    login: res.login,
                    bio: res.bio,
                    html_url: res.html_url,
                    avatar_url: res.avatar_url,
                    followers: res.followers,
                    following: res.following

                }
            })
        });
        setIsLoading(false);
    },[loginName])


    //gets repos affiliated with current user
    const getUsersRepos = useCallback(() => {
        //const userRepos_url:string = `https://api.github.com/users/${loginName}/repos`;
        setIsLoading(true);
        getUserTopRepos(loginName);
        // getSortRequest(userRepos_url,"stars")
        // .then((res) => {
        //     setFollowers(res);
        // });
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