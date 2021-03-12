import { Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { StarRate, PeopleOutline} from '@material-ui/icons/';
import React from 'react';
import {RepoListItem} from '../../../util/types';


type RepoItemProps = {
    
    repoInfo:RepoListItem;
    selectedRepo: (selectedRepo:RepoListItem) => void;
}

const useStyles = makeStyles({
    repoCard:{
        maxwidth:"325px",
        width: "325px",
        margin:"5px",
        padding: "8px 8px 2px 8px",
        border: "1px solid white",
        outline: "1px solid #ddd"

    },
    description:{
        textOverflow:"ellipsis",
        overflow:"hidden",
        whiteSpace:"nowrap"
    },
    repoActions:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        alignContent:"center"
    }
})

const RepoItem:React.FC<RepoItemProps>= ({repoInfo,selectedRepo}:RepoItemProps) => {
    const styles = useStyles();
    return(
        <Card className={styles.repoCard} onClick={()=> {selectedRepo(repoInfo)}}>
            <CardHeader title={repoInfo.name} subheader={repoInfo.language} />
            <CardContent>
                <Typography variant="body1" component="p" className={styles.description}>
                    {(repoInfo.description === null) ? "No Description":repoInfo.description}
                </Typography>
            </CardContent>
            <CardActions >
                    <Typography className={styles.repoActions} paragraph><StarRate />: {repoInfo.stargazers_count}</Typography>
                    <Typography className={styles.repoActions} paragraph><PeopleOutline />: {repoInfo.owner.login}</Typography>
            </CardActions>
        </Card>
    )
}

export default RepoItem;