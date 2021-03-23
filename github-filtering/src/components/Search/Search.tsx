import { FormControl, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {SyntheticEvent, useState} from 'react';
import "./Search.css";

type SearchProps = {
    searchQuery: (query:string) => void;
}

const Search:React.FC<SearchProps> = ({searchQuery}:SearchProps) => {
    
    const [enteredValue, setEnteredValue] = useState<string>("");
    const [disable,setDisable] = useState<boolean>(true);

    const submitHandler = (event:SyntheticEvent) => {
        event.preventDefault();
        searchQuery(enteredValue);
        //setEnteredValue("");

    }

    


    return (
        <form onSubmit={submitHandler} className="searchRepos">
            <FormControl fullWidth className="formStyle" >
                    <Button disabled={disable} type="submit"><SearchIcon/></Button>
                <TextField
                required
                fullWidth 
                placeholder="Search..."
                value = {enteredValue}
                onChange ={(event) => {
                    setDisable(false);
                    setEnteredValue(event.target.value);
                    
                }}
                />
            </FormControl>
        </form>

    );
}



export default Search;