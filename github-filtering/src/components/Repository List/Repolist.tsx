import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { LanguageFilter, RepoListItem } from '../../util/types';
import RepoItem from "./RepoList Item/RepoListItem";

type RepolistProps = {
    RepoData:RepoListItem[];
    Filters:LanguageFilter[];
    filtered:RepoListItem[];
    clicked: (selectedRepo:RepoListItem) => void;

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

const Repolist:React.FC<RepolistProps> = ({RepoData, Filters, filtered, clicked}:RepolistProps) => {
    const styles = useStyles();
    const activatedFilters:LanguageFilter[] = Filters.filter((f) => f.active === true);
    let data:RepoListItem[] = (!activatedFilters.length)? RepoData:(activatedFilters.length && filtered.length)?filtered:[];
    if(data.length){
        return (
            <div className={styles.listSegment}>
                <div className={styles.repoItems}>
                {data.map((rInfo) =>(
                        <RepoItem key={rInfo.node_id} repoInfo={rInfo} selectedRepo={clicked} /> 
                ))}
                </div>
            </div>
    
        );
    }else{
        return (
            <Typography paragraph> No results from search</Typography>
        )
    }
    

}

export default Repolist;