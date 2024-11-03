import { Status } from "app-types/subject-dynamic/status/type";
import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.styl";

type Props = {
    regularDamage: Decimal
    criticalDamage: Decimal
    status: Status
}

const criticalHit: React.FC<Props> = props => {
    return (
        <tr>
            <td><FormattedMessage id="app.critical-hit" /></td>
            <td>
                {props.regularDamage.toString()}
                <> x </>
                (175% + <span className={table.small}><FormattedMessage id="status.critical-damage" /></span>{props.status.criticalDamage.calculatedValue.toString()}%)
                <> = </>
                {props.criticalDamage.toString()}
            </td>
        </tr>
    );
}

export default criticalHit;
