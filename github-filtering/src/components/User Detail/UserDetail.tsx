import React from "react";
import {Owner} from "../../util/types";

type UserDetailProps = {
    currentOwner:Owner;
}

const UserDetail:React.FC<UserDetailProps> = ({currentOwner}:UserDetailProps) => {
    return(
        <div className="user-detail">

        </div>
    );
}

export default UserDetail;