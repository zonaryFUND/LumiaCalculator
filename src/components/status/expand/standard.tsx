import React from "react";
import InnerTable from "components/common/inner-table";
import { CalculatedStatusValue, StatusValue } from "app-types/subject-dynamic/status/type";
import BasePlusPerLevel from "./base-plus-per-level";
import Mastery from "./mastery";
import Equipment from "./equipment";
import Ratio from "./ratio";
import { FormattedMessage } from "react-intl";

type Props = Partial<StatusValue & CalculatedStatusValue> & {
    level: number
    digit: number
}

const standardExpand: React.FC<Props> = props => {
    return (
        <InnerTable>
            {
                props.base && props.perLevel ? 
                <BasePlusPerLevel 
                    base={props.base} 
                    perLevel={props.perLevel} 
                    level={props.level} 
                    digit={props.digit} 
                    label={<FormattedMessage id="app.subject" />} 
                    multiplierLabel={<FormattedMessage id="app.level" />}
                /> 
                : null
            }
            {props.equipment && props.equipment.ratio == undefined ? <Equipment {...props.equipment} level={props.level} /> : null}
            {props.equipment?.adaptive ? <tr><td><FormattedMessage id="status.adaptive" /></td><td>{props.equipment.adaptive.toString()}</td></tr> : null}
            {props.overrideAdditional ? <tr><td><FormattedMessage id={props.overrideAdditional.nameKey} /></td><td>{props.overrideAdditional.value?.toString()}</td></tr> : null}
            {props.equipment && props.equipment.ratio != undefined ? <Ratio ratio={props.equipment.ratio} label={<FormattedMessage id="app.equipment" />} /> : null}
        </InnerTable>
    );
}

export default standardExpand;
