import * as React from "react";
import { FormattedMessage } from "react-intl";
import { MitigationInfo } from "../../mitigated-damage";

const mitigation: React.FC<MitigationInfo> = props => {
    const equation = (() => {
        if (props.subtractionCount) {
            return (
                <td>
                    {props.value.toString()}
                    {
                        props.subtractionCount == 1 ? null :
                        <>  x {props.subtractionCount} = {props.mitigated.toString()}</>
                    }
                </td>
            );
        } else {
            return (
                <td>
                    {props.base.toString()} x -{props.value.toString()}% = {props.mitigated.toString()}
                </td>
            );
        }
    })();

    return (
        <tr>
            <td><FormattedMessage id={props.labelIntlID} /></td>
            {equation}
        </tr>
    )
}

export default mitigation;