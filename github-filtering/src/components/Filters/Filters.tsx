import { FormControl,FormGroup, FormControlLabel, FormLabel, Checkbox, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    filterGroup:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap"
    }
});
const Filters:React.FC = () => {
    const filterTypes:string[] = ['Java', 'Python', 'JavaScript', 'TypeScript']
    const styles = useStyles();
 
    return (
        <section>
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter By:</FormLabel>
                <FormGroup className={styles.filterGroup}>
                    {filterTypes.map((filter, idx) => (
                        <FormControlLabel key={idx} control={<Checkbox checked={false} name={filter} />} label={filter}/>
                    ))}
                </FormGroup>
            </FormControl>
        </section>

    );
}

export default Filters;