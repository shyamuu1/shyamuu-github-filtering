import { Card, Avatar, CardHeader, CardContent, Typography, makeStyles, Link} from "@material-ui/core";
import {PeopleOutline, StarOutline} from '@material-ui/icons/';
import React from "react";
import {Owner} from "../../util/types";

type UserDetailProps = {
    currentOwner:Owner;
    
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
    }, 
    AvatarStyle:{
        height:"260px",
        width:"260px",
    },
    header:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center"
    }
    
})

const UserDetail:React.FC<UserDetailProps> = ({currentOwner}:UserDetailProps) => {
    const styles = useStyles();
    const bull = <span className={styles.bullet}>•</span>;
    const followers_url = `https://github.com/${currentOwner.login}?tab=followers`;
    return(
        <div className={styles.userDetail}>
            <Card>
                <CardHeader
                className={styles.header}
                avatar={<Avatar className={styles.AvatarStyle} alt="My avatar" src={currentOwner.avatar_url} />}
                title={currentOwner.login + " Repository Page"}
                />
                <CardContent>
                    <Typography className={styles.userContent}>
                    <PeopleOutline/>&nbsp;{currentOwner.followers}&nbsp;<Link href={followers_url} color="inherit"> followers</Link>&nbsp;{bull}&nbsp;<StarOutline /> 0
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;