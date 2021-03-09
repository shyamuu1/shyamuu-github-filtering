import { Card, Avatar, CardHeader, CardContent, Typography, makeStyles, Link, CardActions, Button, Divider} from "@material-ui/core";
import {PeopleOutline} from '@material-ui/icons/';
import React from "react";
import Organizations from "../Organizations/Organizations";
import {Owner} from "../../util/types";

type UserDetailProps = {
    currentOwner:Owner;
    
}

const useStyles = makeStyles({
    userDetail: {
        display:"flex",
        flexDirection:"column",
        maxWidth: "300px",
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
    },
    customCardStyle:{
        border:"none",
        boxShadow:"none"
    },
    OrganizationList: {
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap"
    }
    
})

const UserDetail:React.FC<UserDetailProps> = ({currentOwner}:UserDetailProps) => {
    const styles = useStyles();
    const bull = <span className={styles.bullet}>•</span>;
    const followers_url = `https://github.com/${currentOwner.login}?tab=followers`;
    return(
        <div className={styles.userDetail}>
            <Card className={styles.customCardStyle}>
                <CardHeader
                className={styles.header}
                avatar={<Avatar className={styles.AvatarStyle} alt="My avatar" src={currentOwner.avatar_url} />}
                title={<Typography variant="subtitle1">{currentOwner.login.toUpperCase() + " Repository Page"}</Typography>}
                />
                <CardContent>
                    <Typography paragraph>{(currentOwner.bio !== "")? currentOwner.bio:"No Description"}</Typography>
                    <Typography className={styles.userContent}>
                    <PeopleOutline/>&nbsp;{currentOwner.followers}&nbsp;
                    <Link href={followers_url} color="inherit"> followers</Link>
                    &nbsp;{bull}&nbsp;{currentOwner.following}&nbsp;following
                    </Typography>
                </CardContent>
                <CardActions>
                <Button fullWidth variant="outlined" color="primary" href={currentOwner.html_url}>
                    View Repository
                </Button>
                </CardActions>
                <Divider light />
                <Typography variant="h6">Organizations</Typography>
                <Organizations />
            </Card>
        </div>
    );
}

export default UserDetail;