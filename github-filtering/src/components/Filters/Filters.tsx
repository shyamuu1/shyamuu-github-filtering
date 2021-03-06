import { FormControl,FormGroup, FormControlLabel, FormLabel, Checkbox, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Filters_arr, { LanguageFilter } from '../../util/types';

const useStyles = makeStyles({
    filterSection:{
        display:"flex",
        justifyContent:"center"
    },
    filterGroup:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        padding: "8px"
    }
});
type FilterProps = {
    updateFilters: (currentFilters:LanguageFilter[]) => void;
}
const Filters:React.FC<FilterProps> = ({updateFilters}:FilterProps) => {
    const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);
    const styles = useStyles();


    // const filterCheck = (name:string) => {
    //     return filters.find((f) => f.name === name) !== undefined;
    // }
    
    const handleChange = (idx:number) =>{
        filters[idx].active = !filters[idx].active
        setFilters((filters) => [...filters]);
        updateFilters(filters);
    }
 
    return (
        <section >
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter By:</FormLabel>
                <FormGroup className={styles.filterGroup}>
                    {filters.map((filter, idx) => (
                        <FormControlLabel key={idx} control={<Checkbox checked={filter.active} name={filter.name} onChange={() => {handleChange(idx)}} />} label={filter.name}/>
                    ))}
                </FormGroup>
            </FormControl>
        </section>

    );
}

export default Filters;