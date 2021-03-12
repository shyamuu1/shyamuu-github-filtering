import { makeStyles, FormControl, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {SyntheticEvent, useState} from 'react';

const useStyles = makeStyles({
    search:{
        display:"flex",
        paddingTop: "8px",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center"
    },
    formStyle:{
        width: "80%",
        border: "1px solid black",
        borderRadius: "5px",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
});

type SearchProps = {
    searchQuery: (query:string) => void;
}

const SearchRepos:React.FC<SearchProps> = ({searchQuery}:SearchProps) => {
    
    const styles = useStyles();
    const [enteredValue, setEnteredValue] = useState<string>("");

    const submitHandler = (event:SyntheticEvent) => {
        event.preventDefault();
        searchQuery(enteredValue);
        //setEnteredValue("");

    }

    


    return (
        <form onSubmit={submitHandler} className={styles.search}>
            <FormControl fullWidth className={styles.formStyle} >
                    <Button type="submit"><SearchIcon/></Button>
                <TextField
                fullWidth 
                placeholder="Search..."
                value = {enteredValue}
                onChange ={(event) => setEnteredValue(event.target.value)}
                />
            </FormControl>
        </form>

    );
}



export default SearchRepos;