import React from"react";
import {Avatar, makeStyles} from "@material-ui/core";
import {Orgs } from "../../util/types";


const useStyles = makeStyles({
    orgsStyle:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-evenly"
    },
    AvatarStyle:{
        paddingTop:"8px",
        paddingLeft:"2px",
        paddingRight:"2px"
    }
})
type OrganizationProps = {
    orgs:Orgs[];
}
const Organizations:React.FC<OrganizationProps> = ({orgs}:OrganizationProps) => {
    
    const styles = useStyles();

    return (
        <div className={styles.orgsStyle}>
        {orgs.map((v) => (
            <Avatar className={styles.AvatarStyle}variant="rounded" key={v.id} src={v.avatar_url} alt="org imgs" />
        ))}
        </div>

    );

};

export default Organizations;