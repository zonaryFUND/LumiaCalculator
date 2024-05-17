import * as React from "react";
import style from "./inner-table.module.styl";

type Props = {
    children?: React.ReactNode
}

const innerTable: React.FC<Props> = props => (
    <table className={style.inner}>
        <tbody>
            {props.children}    
        </tbody>
    </table>
);

export default innerTable;