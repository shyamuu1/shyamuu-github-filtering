import { Container } from '@material-ui/core';
import Banner from "../../components/Banner/Banner";
import React, { useContext, useEffect,useState,useCallback } from 'react';
import UserDetail from '../../components/User Detail/UserDetail';
import { OwnerContext } from '../../context/owner-context';
import { getRequest, getUsersByQuery } from '../../util/apiService';
import { Owner } from '../../util/types';

const SearchDetailPage:React.FC = () => {
    const {ownerId, star_count} = useContext(OwnerContext);
    const [users, setUsers] = useState<Owner[]>([]);
    const [followers, setFollowers] = useState<Owner[]>([]);
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    console.log(ownerId, star_count);
    console.log(users);
    console.log(followers);

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
        getRequest(user_url)
        .then((res) => {
            setUsers([...users,res]);
        });
    },[ownerId, users])

    const getFollowers = useCallback(() => {
        let followers_url:string = `https://api.github.com/users/${ownerId}/followers`;
        setIsLoading(true);
        getRequest(followers_url)
        .then((res) => {
            setIsLoading(false);
            setFollowers(res);
        });
    },[ownerId])


    useEffect(() => {
        try{
            if(isMounted){
                getUser();
            }else{
                return () => {setIsMounted(false)};
            }
        }catch(err){
            console.log(err.message);
        }
    },[getFollowers, getUser, isMounted])
    
    let userDetail = (!isLoading && users.length)?<UserDetail currentOwner={users[0]} following={followers.length} />: null;
    return(
        <>
        <Container>
            <div>
            {userDetail}
            {/* Listcomponent */}
            </div>
        </Container>
        </>
    );
}

export default SearchDetailPage;