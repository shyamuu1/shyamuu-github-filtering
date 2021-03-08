import React, {createContext, useState} from 'react';

export type OwnerCtx = {
    ownerId:string;
    star_count:number;
    setCurrentOwnerId: (id:string) => void;
    setStars: (stars:number) => void;
}

export const OwnerContext = createContext<OwnerCtx>({
    ownerId:"",
    star_count:0,
    setCurrentOwnerId: (id:string) => {},
    setStars: (stars:number) => {}
});

type OwnerCtxProps = {
    children:React.ReactNode;
}


const OwnerContextProvider:React.FC<OwnerCtxProps> = ({children}:OwnerCtxProps)=> {
    const [ownerId, setOwnerId] = useState<string>("");
    const [starCount, setStarCount] = useState<number>(0);

    const updateOwnerId = (node_id:string) => {
        setOwnerId(node_id);
    }

    const setCurrentStars = (stars:number) => {
        setStarCount(stars);
    }

    return(
        <OwnerContext.Provider 
        value={{
            ownerId:ownerId,
            star_count:starCount,
            setCurrentOwnerId:updateOwnerId,
            setStars:setCurrentStars
            }}>
            {children}
        </OwnerContext.Provider>
    );

}
export default OwnerContextProvider;