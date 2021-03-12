import React, {createContext, useState} from 'react';

export type OwnerCtx = {
    loginName:string;
    query:string;
    setCurrentLogin: (id:string) => void;
    setCurrentQuery: (q:string) => void;
}

export const OwnerContext = createContext<OwnerCtx>({
    loginName:"",
    query:"",
    setCurrentLogin: (id:string) => {},
    setCurrentQuery: (q:string) => {}
});

type OwnerCtxProps = {
    children:React.ReactNode;
}


const OwnerContextProvider:React.FC<OwnerCtxProps> = ({children}:OwnerCtxProps)=> {
    const [loginName, setLogin] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    const updateLogin = (login:string) => {
        setLogin(login);
    }

    const updateQuery = (searchInput:string) => {
        setQuery(searchInput);
    }


    return(
        <OwnerContext.Provider 
        value={{
            loginName:loginName,
            query:query,
            setCurrentLogin:updateLogin,
            setCurrentQuery:updateQuery
            }}>
            {children}
        </OwnerContext.Provider>
    );

}
export default OwnerContextProvider;