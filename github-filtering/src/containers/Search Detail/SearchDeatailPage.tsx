import { Container, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect,useState,useCallback } from 'react';
import UserDetail from '../../components/User Detail/UserDetail';
import { OwnerContext } from '../../context/owner-context';
import { getRequest} from '../../util/apiService';
import { Owner } from '../../util/types';
import Userlist from '../../components/User Popular Repo List/UserList';

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
    }
})

const SearchDetailPage:React.FC = () => {
    const {ownerId} = useContext(OwnerContext);
    const [users, setUsers] = useState<Owner[]>([]);
    const [user, setUser] = useState<Owner>(default_Owner);
    const [followers, setFollowers] = useState<Owner[]>([]);
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const styles =  useStyles()
    
    console.log(user);
    

    // const getUsers = useCallback(() => {
    //     setIsLoading(true);
    //     getUsersByQuery(ownerId)
    //     .then((res) => {
    //         setIsLoading(false);
    //         setUsers(res.items.filter((v:Owner) => v.login === ownerId));

    //     });
    // },[ownerId]);

    const getUser = useCallback(() => {
        let user_url:string = `https://api.github.com/users/${ownerId}`
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
    },[ownerId])

    const getUsersRepos = useCallback(() => {
        let followers_url:string = `https://api.github.com/users/${ownerId}/repos`;
        setIsLoading(true);
        getRequest(followers_url)
        .then((res) => {
            setIsLoading(false);
            console.log(res);
        });
    },[ownerId])

    


    useEffect(() => {
        try{
            if(isMounted){
                getUser();
                getUsersRepos();
            }else{
                return () => {setIsMounted(false)};
            }
        }catch(err){
            console.log(err.message);
        }
    },[ isMounted])
    
    let userDetail = (!isLoading)?<UserDetail currentOwner={user} />: null;
    return(
        <section>
        <Container className={styles.searchDetailContent}>
            <React.Fragment>
            {userDetail}
            <Userlist />
            </React.Fragment>
        </Container>
        </section>
    );
}

export default SearchDetailPage;