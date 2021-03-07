import { Container } from '@material-ui/core';
import Banner from "../../components/Banner/Banner";
import React, { useContext, useEffect,useState,useCallback } from 'react';
import UserDetail from '../../components/User Detail/UserDetail';
import { OwnerContext } from '../../context/owner-context';
import { getUsersByQuery } from '../../util/apiService';
import { Owner } from '../../util/types';

const SearchDetailPage:React.FC = () => {
    const {ownerId} = useContext(OwnerContext);
    const [users, setUsers] = useState<Owner[]>([]);
    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    console.log(ownerId);
    console.log(users);

    const getUsers = useCallback(() => {
        setIsLoading(true);
        getUsersByQuery(ownerId)
        .then((res) => {
            setIsLoading(false);
            setUsers(res.items.filter((v:Owner) => v.login === ownerId));

        });
    },[ownerId]);

    useEffect(() => {
        try{
            if(isMounted){
                getUsers();
            }else{
                return () => {setIsMounted(false)};
            }
        }catch(err){
            console.log(err.message);
        }
    },[getUsers, isMounted])
    
    let userDetail = (!isLoading && users.length)?<UserDetail currentOwner={users[0]} />: null;
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