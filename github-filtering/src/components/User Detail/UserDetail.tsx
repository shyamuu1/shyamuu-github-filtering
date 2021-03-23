import { Card, Avatar, CardHeader, CardContent, Typography, Link, CardActions, Button} from "@material-ui/core";
import {PeopleOutline} from '@material-ui/icons/';
import React from "react";
import {Owner} from "../../util/types";
import "./UserDetail.css";
type UserDetailProps = {
    currentOwner:Owner;
    
}


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