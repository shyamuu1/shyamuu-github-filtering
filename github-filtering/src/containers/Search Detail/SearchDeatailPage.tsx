import { Button, Container, Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect,useState,useCallback } from 'react';
import UserDetail from '../../components/User Detail/UserDetail';
import { OwnerContext } from '../../context/owner-context';
import { getRequest, getSortRequest} from '../../util/apiService';
import { Owner, RepoListItem, Orgs } from '../../util/types';
import Userlist from '../../components/User Popular Repo List/UserList';
import Loader from "../../UI/Spinner/Loader";
import Organizations from '../../components/Organizations/Organizations';
import { useHistory } from 'react-router';

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
const useStyles = makeStyles({
    searchDetailContent:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        paddingTop:"16px",
        paddingLeft:"8px",
        justifyContent:"space-evenly"
    },
    OrgsandRepoContent:{
        display:"flex",
        flexDirection:"column",
        
    },
    BackButton:{
        display:"flex",
        padding:"8px",
        width: "100%",
        flexDirection:"row",
        justifyContent:"center"
    },
    searchDetailPage: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignContent:"center",
    }
})

const SearchDetailPage:React.FC = () => {
    const {loginName} = useContext(OwnerContext);
    const [user, setUser] = useState<Owner>(default_Owner);
    const [followers, setFollowers] = useState<RepoListItem[]>([]);
    const [orgs, setOrgs] = useState<Orgs[]>([]);
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const history = useHistory();
    const styles =  useStyles()
    
    console.log(user);
    

    const getOrganizations = useCallback(() => {
        const orgs_url:string = `https://api.github.com/users/${loginName}/orgs`;
        setIsLoading(true);
        getRequest(orgs_url)
        .then((res) =>  {
            setIsLoading(false);
            setOrgs(res);
        })
    }, [loginName])

    const getUser = useCallback(() => {
        let user_url:string = `https://api.github.com/users/${loginName}`
        setIsLoading(true);
        getRequest(user_url)
        .then((res) => {
            setIsLoading(false);
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
    },[loginName])

    const getUsersRepos = useCallback(() => {
        let followers_url:string = `https://api.github.com/users/${loginName}/repos`;
        setIsLoading(true);
        getSortRequest(followers_url,"stars")
        .then((res) => {
            setIsLoading(false);
            setFollowers(res);
        });
    },[loginName])

    


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
            console.log(err.message);
        }
    },[ isMounted])

    const goBackButtonHandler = () => {
        history.push("/");
    }
    
    let userFragment = (!isLoading)? (
        <React.Fragment>
            <UserDetail currentOwner={user}/>
            <section className={styles.OrgsandRepoContent}>
            <Typography variant="h6">Organizations</Typography>
            <Divider />
            <Organizations orgs={orgs} />
            <Userlist repos={followers}/>
            </section>
        </React.Fragment>
    ):<Loader />
    return(
        <section>
        <Container className={styles.searchDetailContent}>
            {userFragment}
            <div className={styles.BackButton}>
            <Button style={{maxWidth:"300px"}} fullWidth variant="outlined" color="primary" onClick={goBackButtonHandler} >Go Back to Seach</Button>
            </div>
        </Container>  
        </section>
    );
}

export default SearchDetailPage;