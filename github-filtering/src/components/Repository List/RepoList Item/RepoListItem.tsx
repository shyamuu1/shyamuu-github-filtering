import { Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import {RepoListItem} from '../../../util/types';

type RepoItemProps = {
    
    repoInfo:RepoListItem;
}

const RepoItem:React.FC<RepoItemProps>= ({repoInfo}:RepoItemProps) => {
    console.log(repoInfo);
    return(
        <Card key={repoInfo.node_id}>
            <CardHeader title={repoInfo.name} subheader={repoInfo.language} />
            <CardContent>
                <Typography>
                    {repoInfo.description}
                </Typography>
            </CardContent>
            <CardActions>
                <CardContent>
                    <span>Stars: {repoInfo.star_gazerscount}</span>
                    <span>Owner: {repoInfo.owner}</span>
                </CardContent>
            </CardActions>
        </Card>
    )
}

export default RepoItem;