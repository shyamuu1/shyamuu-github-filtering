import React, {useState} from "react";
import {FormGroup, FormControlLabel, Switch} from "@material-ui/core";

type ToggleSortProps = {
    sorted:(sort_arr:boolean) => void;
    active:boolean;
}

const ToggleSort:React.FC<ToggleSortProps> = ({sorted, active}:ToggleSortProps) => {
    const [isSorted, setIsSorted] =  useState<boolean>(false);

    //keeps track of whether the switch is active or not active
    const handleToggleChange = () => {
        sorted(!isSorted);
        setIsSorted(!isSorted);
        

    }
    return (
        <>
        <FormGroup>
            <FormControlLabel control={<Switch disabled={!active} checked={isSorted} onChange={() => {handleToggleChange()}} name="Sorted"/>}
            label="Sort by stars" />
        </FormGroup>
        </>
    );
};

export default ToggleSort;