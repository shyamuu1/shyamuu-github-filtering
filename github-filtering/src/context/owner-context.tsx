import React, {createContext, useState} from 'react';

export type OwnerCtx = {
    ownerId:string;
    setCurrentOwnerId: (id:string) => void;
}

export const OwnerContext = createContext<OwnerCtx>({
    ownerId:"",
    setCurrentOwnerId: (id:string) => {}
});

type OwnerCtxProps = {
    children:React.ReactNode;
}


const OwnerContextProvider:React.FC<OwnerCtxProps> = ({children}:OwnerCtxProps)=> {
    const [ownerId, setOwnerId] = useState<string>("");

    const updateOwnerId = (node_id:string) => {
        setOwnerId(node_id);
    }


    return(
        <OwnerContext.Provider 
        value={{
            ownerId:ownerId,
            setCurrentOwnerId:updateOwnerId
            }}>
            {children}
        </OwnerContext.Provider>
    );

}
export default OwnerContextProvider;