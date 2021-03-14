import { FormControl,FormGroup, FormControlLabel, FormLabel, Checkbox, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Filters_arr, { LanguageFilter } from '../../util/types';

const useStyles = makeStyles({
    filterGroup:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        padding: "8px"
    },
    filterInactive:{
        display:"none"
    }
});
type FilterProps = {
    updateFilters: (currentFilters:LanguageFilter[]) => void;
    active:boolean;
}
const Filters:React.FC<FilterProps> = ({updateFilters, active}:FilterProps) => {
    const [filters, setFilters] = useState<LanguageFilter[]>(Filters_arr);
    const styles = useStyles();

    //updates active property for a filter selected by index
    const handleChange = (idx:number) =>{
        filters[idx].active = !filters[idx].active
        let currentFilters = [...filters]
        setFilters(currentFilters)
        updateFilters(currentFilters);
    }
 
    return (
        <section >
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter By:</FormLabel>
                <FormGroup className={(active)?styles.filterGroup:styles.filterInactive}>
                    {filters.map((filter, idx) => (
                        <FormControlLabel key={idx} control={<Checkbox checked={filter.active} name={filter.name} onChange={() => {handleChange(idx)}} />} label={filter.name}/>
                    ))}
                </FormGroup>
            </FormControl>
            
        </section>

    );
}

export default Filters;