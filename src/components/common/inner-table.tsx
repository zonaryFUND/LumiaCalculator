import * as React from "react";
import style from "./inner-table.module.styl";

const innerTable: React.FC = props => (
    <table className={style.inner}>
        <tbody>
            {props.children}    
        </tbody>
    </table>
);

export default innerTable;