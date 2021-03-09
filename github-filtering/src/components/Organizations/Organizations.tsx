import React, {useState, useCallback, useEffect, useContext} from"react";
import {Avatar, makeStyles} from "@material-ui/core";
import {getRequest} from "../../util/apiService";
import {Orgs } from "../../util/types";
import { OwnerContext } from "../../context/owner-context";

const useStyles = makeStyles({
    orgsStyle:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-evenly"
    }
})

const Organizations:React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(true);
    const [orgs, setOrgs] = useState<Orgs[]>([]);
    const {ownerId} = useContext(OwnerContext);
    const styles = useStyles();


    const getOrganizations = useCallback(() => {
        const orgs_url:string = `https://api.github.com/users/${ownerId}/orgs`;
        setIsLoading(true);
        getRequest(orgs_url)
        .then((res) =>  {
            setIsLoading(false);
            setOrgs(res);
        })
    }, [ownerId])

    useEffect(() => {
        if(mounted){
            getOrganizations();
        }else{
            return () => {setMounted(false)}
        }
    }, [mounted])

    let avatarList = (!isLoading)? (orgs.map((v) => {
        return <Avatar variant="rounded" key={v.id} src={v.avatar_url} alt="org imgs"/>
    })):null;

    return (
        <div className={styles.orgsStyle}>
        {avatarList}
        </div>

    );

};

export default Organizations;