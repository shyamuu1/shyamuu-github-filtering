import { FormControl,FormGroup, FormControlLabel, FormLabel, Checkbox, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
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

const Filters:React.FC = () => {
    const currentFilters:LanguageFilter[] = Default_Filters;
    const [filters, setFilters] = useState<LanguageFilter[]>(currentFilters);
    const styles = useStyles();


    const filterCheck = (name:string) => {
        return currentFilters.find((f) => f.name === name) !== undefined;
    }
    
    const handleChange = (idx:number) =>{
        currentFilters[idx].active = !currentFilters[idx].active
        setFilters((filters) => [...filters]);
    }
 
    return (
        <section>
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