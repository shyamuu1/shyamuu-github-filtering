import { Card, Avatar, CardHeader, CardContent, Typography, Link, CardActions, Button} from "@material-ui/core";
import {PeopleOutline} from '@material-ui/icons/';
import React from "react";
import {Owner} from "../../util/types";
import "./UserDetail.css";
type UserDetailProps = {
    currentOwner:Owner;
    
}

// const useStyles = makeStyles({
//     userDetail: {
//         display:"flex",
//         flexDirection:"column",
//         width:"500px"
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//       },
//     userContent:{
//         display:"flex",
//         flexDirection:"row",
//         flexWrap:"wrap" 
//     }, 
//     AvatarStyle:{
//         maxHeight:"260px",
//         maxWidth:"260px",
//         minWidth:"190px",
//         minHeight:"190px"
//     },
//     header:{
//         display:"flex",
//         flexDirection:"column",
//         justifyContent:"center"
//     },
//     customCardStyle:{
//         border:"none",
//         boxShadow:"none"
//     },
//     userDetailActions:{
//         display:"flex",
//         flexDirection:"row",
//         width:"100%",
//         justifyContent:"center"
//     }
    
// })

const UserDetail:React.FC<UserDetailProps> = ({currentOwner}:UserDetailProps) => {
    
    const bull = <span className="bullet">•</span>;
    const followers_url = `https://github.com/${currentOwner.login}?tab=followers`;
    return(
        <div className="userDetail">
            <Card className="customCardStyle">
                <CardHeader
                className="header"
                avatar={<Avatar className="AvatarStyle" alt="My avatar" src={currentOwner.avatar_url} />}
                title={<Typography variant="subtitle1">{currentOwner.login.toUpperCase() + " Repository Page"}</Typography>}
                />
                <CardContent>
                    <Typography paragraph>{(currentOwner.bio !== "")? currentOwner.bio:"No Description"}</Typography>
                    <Typography className="userContent">
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
            </Card>
        </div>
    );
}

export default UserDetail;