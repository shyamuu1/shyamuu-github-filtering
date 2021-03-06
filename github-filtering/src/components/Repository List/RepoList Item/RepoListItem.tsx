import { Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import {RepoListItem} from '../../../util/types';

type RepoItemProps = {
    
    repoInfo:RepoListItem;
    selectedRepo: (node_id:string) => void;
}

const useStyles = makeStyles({
    repoCard:{
        width:"325px",
        margin:"5px",
        padding: "8px 8px 2px 8px"
    },
    description:{
        textOverflow:"ellipsis",
        overflow:"hidden",
        whiteSpace:"nowrap"
    }
})

const RepoItem:React.FC<RepoItemProps>= ({repoInfo,selectedRepo}:RepoItemProps) => {
    const styles = useStyles();
    return(
        <Card className={styles.repoCard} onClick={()=> {selectedRepo(repoInfo.node_id)}}>
            <CardHeader title={repoInfo.name} subheader={repoInfo.language} />
            <CardContent>
                <Typography variant="body1" component="p" className={styles.description}>
                    {(repoInfo.description === null) ? "No Description":repoInfo.description}
                </Typography>
            </CardContent>
            <CardActions>
                    <Typography paragraph>Stars: {repoInfo.stargazers_count}</Typography>
                    <Typography paragraph>Owner: {repoInfo.owner.login}</Typography>
            </CardActions>
        </Card>
    )
}

export default RepoItem;