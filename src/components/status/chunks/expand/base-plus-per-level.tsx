import Decimal from "decimal.js";
import * as React from "react";
import style from "./expand.module.styl";
import table from "components/common/table.module.styl";

type Props = {
    base?: Decimal
    perLevel?: Decimal
    level: number
    label: React.ReactNode
    multiplierLabel: React.ReactNode
    digit: number
}

const basePlusPerLevel: React.FC<Props> = props => {
    const value = React.useMemo(() => {
        return (props.base ?? new Decimal(0)).add(props.perLevel?.times(props.level - 1) ?? 0).cut(props.digit, "round");
    }, [props.base, props.perLevel]);
    
    return (
        <tr><td>{props.label}</td><td>
            {props.base?.toString()}
            {props.base && props.perLevel ? <> + </> : null}
            {props.perLevel ? <>{props.perLevel.times(props.level - 1).toString()} <span className={style.multiply}>({props.perLevel.toString()} x <span className={table.small}>{props.multiplierLabel}</span>{props.level - 1})</span></> : null}
            <> = {value.toString()}</>
        </td></tr>
    );
};

export default basePlusPerLevel;