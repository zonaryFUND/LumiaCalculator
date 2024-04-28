import Decimal from "decimal.js";
import * as React from "react";

type Props = {
    constant?: Decimal
    perLevel?: Decimal
    ratio?: Decimal
    level: number
    baseValue: Decimal
}

const additional: React.FC<Props> = props => {
    if (props.constant?.greaterThan(0) || props.perLevel?.greaterThan(0)) {
        const constant = props.constant?.greaterThan(0) ? <>{props.constant.toString()}</> : null
        const perLevel = props.perLevel?.greaterThan(0) ? <>{props.perLevel.times(props.level).toString()} <span>({props.perLevel.toString()} x {props.level})</span></> : null
        return (
            <>
                {constant}
                {constant && perLevel ? " + " : null}
                {perLevel}
                {
                    props.perLevel?.greaterThan(0) ?
                    <> = {(props.constant ?? new Decimal(0)).add((props.perLevel).times(props.level)).toString()}</> :
                    null
                }
            </>
        );
    } else if (props.ratio?.greaterThan(0)) {
        return (
            <>
                {props.ratio.toString()}％
                <> = {props.baseValue.percent(props.ratio).toString()}</>
            </> 
        );
    } else {
        return <>0</>;
    }
};

export default additional;