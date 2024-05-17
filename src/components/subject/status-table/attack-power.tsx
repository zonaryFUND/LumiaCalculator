import * as React from "react";
import useBaseValue from "./use-base-value";
import BaseValue from "./base-value";
import Additional from "./additional-value";
import Decimal from "decimal.js";
import InnerTable from "components/common/inner-table";
import Mastery from "../../status/expand/mastery";

/*
type Props = DisplayedValues & MasteryValues & {
    level: number
    mastery: number
    adaptive?: Decimal
    ratio?: Decimal
}

const attackPower: React.FC<Props> = props => {
    const baseValue = useBaseValue({...props.base, level: props.level, digit: 0, method: "floor"});

    return (
        <InnerTable>
            <tr><td>実験体</td><td><BaseValue {...{...props.base, level: props.level}} value={baseValue} /></td></tr>
            <tr><td>追加値</td><td><Additional {...{...props.additional, level: props.level, baseValue}} /></td></tr>
            {
                props.perMastery ? 
                <tr><td>熟練度</td><td><Mastery perMastery={props.perMastery} name="武器熟練度" mastery={props.mastery} /></td></tr> : 
                null
            }
            {
                props.adaptive?.greaterThan(0) ?
                <tr><td>適合型能力値</td><td>{props.adaptive.toString()}</td></tr> : 
                null
            }
            {
                props.ratio?.greaterThan(0) ?
                <tr><td>積算補正値</td><td>{props.ratio.toString()}％</td></tr> : 
                null
            }
        </InnerTable>
    );
}

export default attackPower;
*/