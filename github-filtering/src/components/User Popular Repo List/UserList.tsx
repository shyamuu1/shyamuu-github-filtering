import React from "react";
import {Typography,Divider, List, ListItemIcon, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import GithubIcon from "@material-ui/icons/GitHub";
import { RepoListItem} from "../../util/types";

const useStyles = makeStyles({
    ListStyle:{
        display:"flex",
        flexDirection:"column",
        paddingTop:"16px"
    }
})

type UserListProps = {
    repos:RepoListItem[];
}

const Userlist:React.FC<UserListProps> = ({repos}:UserListProps) => {

    const styles = useStyles(); 
    let data = (repos.length < 5)? repos:repos.slice(0,5);

    return (
        <div className={styles.ListStyle}>
        <Typography variant="h6">Popurlar Repositories</Typography>
        <Divider light />
        <List>
            {data.map((r) => (
                <ListItem key={r.node_id} button>
                    <ListItemIcon>
                        <GithubIcon />
                    </ListItemIcon>
                    <ListItemText primary={r.name} secondary="Last updated" />
                </ListItem>
            ))}
        </List>
        </div>
    )
}

export default Userlist;