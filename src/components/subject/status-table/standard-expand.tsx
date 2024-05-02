import React from "react";
import { DisplayedValues } from "../use-status";
import useBaseValue from "./use-base-value";
import BaseValue from "./base-value";
import Additional from "./additional-value";
import InnerTable from "components/common/inner-table";

type Props = DisplayedValues & {
    level: number
    method?: "floor" | "round"
    digit?: number
}

const standardExpand: React.FC<Props> = props => {
    const baseValue = useBaseValue({...props.base, level: props.level, digit: props.digit ?? 0, method: props.method ?? "floor"});

    return (
        <InnerTable>
            <tr><td>実験体</td><td><BaseValue {...{...props.base, level: props.level}} value={baseValue} /></td></tr>
            {
                props.additional.constant?.greaterThan(0) || props.additional.perLevel?.greaterThan(0) || props.additional.ratio?.greaterThan(0) ?
                <tr><td>追加値</td><td><Additional {...{...props.additional, level: props.level, baseValue}} /></td></tr> :
                null
            }
        </InnerTable>
    );
}

export default standardExpand;