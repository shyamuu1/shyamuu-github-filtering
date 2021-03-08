import { Card, Avatar, CardHeader, CardContent, Typography, makeStyles, Link} from "@material-ui/core";
import {PeopleOutline, StarOutline} from '@material-ui/icons/';
import React from "react";
import {Owner} from "../../util/types";

type UserDetailProps = {
    currentOwner:Owner;
    following:number;
}

const useStyles = makeStyles({
    userDetail: {
        display:"flex",
        flexDirection:"column",
        width: "30%",
        paddingTop:"8px"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
    userContent:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap" 
    }
    
})

const UserDetail:React.FC<UserDetailProps> = ({currentOwner, following}:UserDetailProps) => {
    const styles = useStyles();
    const bull = <span className={styles.bullet}>•</span>;
    const followers_url = `https://github.com/${currentOwner.login}?tab=followers`;
    return(
        <div className={styles.userDetail}>
            <Card>
                <CardHeader 
                avatar={<Avatar>{currentOwner.login.slice(0, 1)}</Avatar>}
                title={currentOwner.login + " Repository Page"}
                />
                <CardContent>
                    <Typography className={styles.userContent}>
                    <PeopleOutline/>&nbsp;{following}&nbsp;<Link href={followers_url} color="inherit"> followers</Link>&nbsp;{bull}&nbsp;<StarOutline /> 0
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;