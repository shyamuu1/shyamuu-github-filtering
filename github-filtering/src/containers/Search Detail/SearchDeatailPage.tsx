import React, { useContext, useEffect,useState,useCallback } from 'react';
import { OwnerContext } from '../../context/owner-context';
import { getUsersByQuery } from '../../util/apiService';
import { Owner } from '../../util/types';

const SearchDetailPage:React.FC = () => {
    const {ownerId} = useContext(OwnerContext);
    const [users, setUsers] = useState<Owner[]>([]);
    const [isMounted, setIsMounted] = useState<boolean>(true);
    
    console.log(ownerId);
    console.log(users);

    const getUsers = useCallback(() => {
        getUsersByQuery(ownerId)
        .then((res) => {
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
    
    
    return(
        <>
        </>

    );
}

export default SearchDetailPage;