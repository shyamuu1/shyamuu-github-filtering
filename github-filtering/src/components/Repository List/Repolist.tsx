import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { LanguageFilter, RepoListItem } from '../../util/types';
import RepoItem from "./RepoList Item/RepoListItem";

type RepolistProps = {
    RepoData:RepoListItem[];
    Filters:LanguageFilter[];
    //filtered:RepoListItem[];
    //sortedData:RepoListItem[];
    sort:boolean;
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

const Repolist:React.FC<RepolistProps> = ({RepoData,  Filters,  sort, clicked}:RepolistProps) => {
    const styles = useStyles();
    const sortMyData:RepoListItem[] = RepoData.slice(0).sort((a,b) => b.stargazers_count -a.stargazers_count);
    const activatedFilters:LanguageFilter[] = Filters.filter((f) => f.active === true);
    
    //checks if there are filters and if list needs to be sorted then filters list
    const filterData = ():RepoListItem[] => {
        let currentData:RepoListItem[] = [];
        if(activatedFilters.length && sort === true){
            activatedFilters.forEach((filt) => {
                 currentData= sortMyData.filter((val) => val.language === filt.name);
            })
        }
        else if(!activatedFilters.length && sort === true){
            currentData= sortMyData
        }
        else if(activatedFilters.length && sort === false){
            activatedFilters.forEach((filt) => {
                 currentData = RepoData.filter((val) => val.language === filt.name);
            })
        }
        else{
            currentData = RepoData;
        }
        return currentData;
    }
    let data =  filterData()

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