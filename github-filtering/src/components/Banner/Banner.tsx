import { makeStyles } from "@material-ui/core";
import React from "react";
import bannerImg from "../../assets/images/banner.jpg";

const useStyles = makeStyles({
    bannerContainer:{
        width:"100%",
        height:"100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex:-25
    }, 
    bannerStyle:{
        height:"250px",
        width:"100%"

    }
})

const Banner:React.FC = () => {
    const classes = useStyles();
    return(
        <div className={classes.bannerContainer}>
        <img className={classes.bannerStyle} src={bannerImg} alt="heroImg"/>
        </div>
    );

}

export default Banner;