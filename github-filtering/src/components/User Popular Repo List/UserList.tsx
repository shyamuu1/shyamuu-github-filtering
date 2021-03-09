import React from "react";
import {Typography, List, ListItemIcon, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import GithubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles({
    ListStyle:{
        display:"flex",
        flexDirection:"column"
    }
})
const Userlist:React.FC = () => {

    const styles = useStyles(); 

    return (
        <div className={styles.ListStyle}>
        <Typography variant="h4">Popurlar Repositories</Typography>
        <List>
            <ListItem button>
            <ListItemIcon>
                <GithubIcon />
            </ListItemIcon>
            <ListItemText primary="Repository Name" secondary="Last updated"/>
            </ListItem>
        </List>
        </div>
    )
}

export default Userlist;