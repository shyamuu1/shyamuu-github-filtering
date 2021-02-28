import React from 'react';
import { RepoListItem } from '../../util/types';
import RepoItem from "./RepoList Item/RepoListItem";

type RepolistProps = {
    RepoData:RepoListItem[];
}

const Repolist:React.FC<RepolistProps> = ({RepoData}:RepolistProps) => {

    
    return (
        <ul>
            {RepoData.map((rInfo) =>(
                    <RepoItem repoInfo={rInfo} />
            ))}
        </ul>

    );

}

export default Repolist;