import { Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import {RepoListItem} from '../../../util/types';

type RepoItemProps = {
    
    repoInfo:RepoListItem;
}

const RepoItem:React.FC<RepoItemProps>= ({repoInfo}:RepoItemProps) => {
    console.log(repoInfo);
    return(
        <Card>
            <CardHeader title={repoInfo.name} subheader={repoInfo.language} />
            <CardContent>
                <Typography variant="body2" component="p">
                    {(repoInfo.description === null) ? "No Description":repoInfo.description}
                </Typography>
            </CardContent>
            <CardActions>
                    <Typography paragraph>Stars: {repoInfo.star_gazerscount}</Typography>
                    <Typography paragraph>Owner: {repoInfo.owner.login}</Typography>
            </CardActions>
        </Card>
    )
}

export default RepoItem;