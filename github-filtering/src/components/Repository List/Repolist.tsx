import { makeStyles } from '@material-ui/core';
import React from 'react';
import { RepoListItem } from '../../util/types';
import RepoItem from "./RepoList Item/RepoListItem";

type RepolistProps = {
    RepoData:RepoListItem[];
    Filters:RepoListItem[];
}

const useStyles = makeStyles({
    listSegment:{
        minHeight: "270px",
        maxHeight: "500px",
        overflowY:"scroll",
    },
    repoItems:{
        display:"flex",
        flexDirection:"row",
        flexWrap: "wrap",
        
    }
})

const Repolist:React.FC<RepolistProps> = ({RepoData, Filters}:RepolistProps) => {
    const styles = useStyles();
    let data = (Filters.length)? Filters:RepoData;
    return (
        <div className={styles.listSegment}>
            <div className={styles.repoItems}>
            {data.map((rInfo) =>(
                    <RepoItem key={rInfo.node_id} repoInfo={rInfo} /> 
            ))}
            </div>
        </div>

    );

}

export default Repolist;