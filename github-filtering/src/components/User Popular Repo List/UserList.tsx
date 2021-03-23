import React from "react";
import {Typography,Divider, List, ListItemIcon, ListItem, ListItemText} from "@material-ui/core";
import GithubIcon from "@material-ui/icons/GitHub";
import { RepoListItem} from "../../util/types";
import "./UserList.css";

type UserListProps = {
    repos:RepoListItem[];
}

const Userlist:React.FC<UserListProps> = ({repos}:UserListProps) => {

    let data = (repos.length < 5)? repos:repos.slice(0,5);
    

    return (
        <div className="ListStyle">
        <Typography variant="h6">Popurlar Repositories</Typography>
        <Divider light />
        <List>
            {data.map((r) => (
                <ListItem key={r.node_id} button>
                    <ListItemIcon>
                        <GithubIcon />
                    </ListItemIcon>
                    <ListItemText primary={r.name} secondary={`Last updated at ${r.updated_at.slice(0,10)}`} />
                </ListItem>
            ))}
        </List>
        </div>
    )
}

export default Userlist;