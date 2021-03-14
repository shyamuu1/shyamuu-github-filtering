import React, {useState} from "react";
import {FormGroup, FormControlLabel, Switch, makeStyles} from "@material-ui/core";

type ToggleSortProps = {
    sorted:(sort_arr:boolean) => void;
    active:boolean;
}
const useStyles = makeStyles({
    ToggleSortOn:{
        display:"flex",
    },
    ToggleSortOff:{
        display:"none"
    }
})

const ToggleSort:React.FC<ToggleSortProps> = ({sorted, active}:ToggleSortProps) => {
    const [isSorted, setIsSorted] =  useState<boolean>(false);
    const styles = useStyles();

    //keeps track of whether the switch is active or not active
    const handleToggleChange = () => {
        sorted(!isSorted);
        setIsSorted(!isSorted);
        

    }
    return (
        <>
        <FormGroup >
            <FormControlLabel className={(active)?styles.ToggleSortOn:styles.ToggleSortOff} control={<Switch checked={isSorted} onChange={() => {handleToggleChange()}} name="Sorted"/>}
            label="Sort by stars" />
        </FormGroup>
        </>
    );
};

export default ToggleSort;