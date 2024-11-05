import * as React from "react";
import { FormattedMessage } from "react-intl";
import { MitigationInfo } from "../../mitigated-damage";

const mitigation: React.FC<MitigationInfo> = props => {
    return (
        <tr>
            <td><FormattedMessage id={props.labelIntlID} /></td>
            <td>{props.base.toString()} x -{props.value.toString()}% = -{props.mitigated.toString()}</td>
        </tr>
    )
}

export default mitigation;