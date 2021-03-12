import React, {useState} from "react";
import {FormGroup, FormControlLabel, Switch} from "@material-ui/core";

type ToggleSortProps = {
    sorted:(sort_arr:boolean) => void;
}

const ToggleSort:React.FC<ToggleSortProps> = ({sorted}:ToggleSortProps) => {
    const [isSorted, setIsSorted] =  useState<boolean>(false);
    //console.log(isSorted);
    const handleToggleChange = () => {
        sorted(!isSorted);
        setIsSorted(!isSorted);
        

    }
    return (
        <>
        <FormGroup>
            <FormControlLabel control={<Switch checked={isSorted} onChange={() => {handleToggleChange()}} name="Sorted"/>}
            label="Sort by stars" />
        </FormGroup>
        </>
    );
};

export default ToggleSort;