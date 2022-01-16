import { useEffect, useState } from "react";
import { themes } from "./dashboard/appearance";

const Banner = ({height, extraStyles, userData}) => {
    const [colors, setColors] = useState([])
    useEffect(() => {
        let c
        themes.forEach(theme => {
            if(theme.id == userData.theme) {
                c = theme.colors
            }
        });
        if(!c) {
            c = themes[2].colors
        }
        setColors(c)
    }, [userData])

    return (<div className={"w-full  h-" + height + " " + extraStyles}
    style={{background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}`}}>
        </div>)
}

<div className='h-40 -mb-28 bg-gradient-to-r from-cyan-500 to-blue-500 w-full -z-10'/>
export default Banner;