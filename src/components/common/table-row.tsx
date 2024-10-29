import * as React from "react";
import { useToggle } from "react-use";
import style from "./table.styl";

export const MaxColContext = React.createContext(0);

type Props = {
    content: React.ReactNode
    expand?: React.ReactNode
    isHidden?: boolean
}

const tableRow: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);
    const maxCol = React.useContext(MaxColContext);
    React.useEffect(() => {
        if (props.expand == undefined) toggleExpand(false);
    }, [props.expand == undefined]);

    return (
        <>
            <tr onClick={props.expand == undefined ? undefined : toggleExpand} style={props.isHidden ? {display: "none"} : undefined}>
                {props.content}
            </tr>  
            {
                props.expand ? 
                <tr className={style.expand} style={expand && props.isHidden != true ? undefined : {display: "none"}}><td colSpan={maxCol}>{props.expand}</td></tr> :
                null
            }
        </>
    );
};

export default tableRow;