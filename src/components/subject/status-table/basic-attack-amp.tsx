import * as React from "react";
import useBaseValue from "./use-base-value";
import BaseValue from "./base-value";
import Additional from "./additional-value";
import Decimal from "decimal.js";
import InnerTable from "components/common/inner-table";

/*
type Props = MasteryValues & {
    perLevel?: Decimal
    level: number
    mastery: number
}

const basicAttackAmp: React.FC<Props> = props => {
    return (
        <InnerTable>
            {
                props.perLevel?.greaterThan(0) ?
                <tr><td>追加値</td><td><span>{props.perLevel.toString()}％ x 防御熟練度{props.level}</span> = {new Decimal(props.perLevel).times(props.level).toString()}％</td></tr> :
                null
            }
            {
                props.perMastery ? 
                <tr><td>熟練度</td><td><span>{props.perMastery.toString()}％ x 武器熟練度{props.mastery.toString()}</span> = {new Decimal(props.perMastery).times(props.mastery).toString()}％</td></tr> : 
                null
            }
        </InnerTable>
    );
}

export default basicAttackAmp;
*/