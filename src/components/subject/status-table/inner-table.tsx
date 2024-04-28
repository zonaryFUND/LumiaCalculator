import * as React from "react";
import style from "./standard-expand.module.styl";

const innerTable: React.FC = props => (
    <table className={style.inner}>
        <tbody>
            {props.children}    
        </tbody>
    </table>
);

export default innerTable;