import React, {createContext, useState} from 'react';

export type OwnerCtx = {
    loginName:string;
    setCurrentLogin: (id:string) => void;
}

export const OwnerContext = createContext<OwnerCtx>({
    loginName:"",
    setCurrentLogin: (id:string) => {}
});

type OwnerCtxProps = {
    children:React.ReactNode;
}


const OwnerContextProvider:React.FC<OwnerCtxProps> = ({children}:OwnerCtxProps)=> {
    const [loginName, setLogin] = useState<string>("");

    const updateLogin = (login:string) => {
        setLogin(login);
    }


    return(
        <OwnerContext.Provider 
        value={{
            loginName:loginName,
            setCurrentLogin:updateLogin
            }}>
            {children}
        </OwnerContext.Provider>
    );

}
export default OwnerContextProvider;