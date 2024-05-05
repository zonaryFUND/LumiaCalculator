import * as React from "react";
import Decimal from "decimal.js";
import InnerTable from "components/common/inner-table";
import Mastery from "./mastery";
import Additional from "./additional-value";

type Props = {
    constant: Decimal
    perLevel: Decimal
    level: number
    perMastery?: Decimal
    mastery: number
    equipmentRatio?: Decimal
    adaptive?: Decimal
}

const skillAmp: React.FC<Props> = props => {
    return (
        <InnerTable>
            <tr><td>追加値</td><td><Additional {...props} /></td></tr>
            {
                props.adaptive?.greaterThan(0) ?
                <tr><td>適応型能力値</td><td><span>{props.adaptive.toString()} x 2</span> = {props.adaptive.times(2).toString()}</td></tr> : 
                null
            }
            {
                props.perMastery ? 
                <tr><td>熟練度</td><td><Mastery perMastery={props.perMastery} name="武器熟練度" mastery={props.mastery} percent digit={0} /></td></tr> : 
                null
            }
            {
                props.equipmentRatio?.greaterThan(0) ?
                <tr><td>％増幅</td><td>{props.equipmentRatio.toString()}％</td></tr> : 
                null
            }
        </InnerTable>
    );
}

export default skillAmp;