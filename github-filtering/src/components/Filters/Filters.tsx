import { FormControl,FormGroup, FormControlLabel, FormLabel, Checkbox, makeStyles } from '@material-ui/core';
import React, { SyntheticEvent, useState } from 'react';
import { LanguageFilter } from '../../util/types';

const useStyles = makeStyles({
    filterGroup:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap"
    }
});
const Default_Filters:LanguageFilter[] = [
    {name: "Java", active:false},
    {name: "Python", active:false},
    {name: "JavaScript", active:false},
    {name: "TypeScript", active:false}
]
const Default_filter:LanguageFilter= {
    name:"",
    active:false
}
const Filters:React.FC = () => {
    const [currentFilters, setFilters] = useState<LanguageFilter[]>(Default_Filters);
    const [selectedFilter, setFilter] = useState<LanguageFilter>(Default_filter);
    const styles = useStyles();


    const selectFilter = (idx:number) => {
        setFilter({...currentFilters[idx], active:!currentFilters[idx].active});

        // setFilter({...selectFilter, name:filter.name, active:!filter.active});
    }
 
    return (
        <section>
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter By:</FormLabel>
                <FormGroup className={styles.filterGroup}>
                    {currentFilters.map((filter, idx) => (
                        <FormControlLabel key={idx} control={<Checkbox checked={selectedFilter?.active} name={filter.name} 
                        onClick={(e) => {
                            e.preventDefault()
                            selectFilter(idx)
                    }} />} label={filter.name}/>
                    ))}
                </FormGroup>
            </FormControl>
        </section>

    );
}

export default Filters;