import { makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import bannerImg from "../../assets/images/banner.jpg";

const useStyles = makeStyles({
    bannerContainer:{
        width:"100%",
        height:"100%",
        backgroundSize: "center center",
        backgroundRepeat: "no-repeat",
        
    }, 
    bannerStyle:{
        height:"250px",
        width:"100%"

    }
});
type BannerProps = {
    children:ReactNode;
}

const Banner:React.FC<BannerProps> = ({children}:BannerProps) => {
    const classes = useStyles();
    return(
        <section className={classes.bannerContainer}>
        <img className={classes.bannerStyle} src={bannerImg} alt="heroImg"/>
        <div>
            {children}
        </div>
        </section>
    );

}

export default Banner;