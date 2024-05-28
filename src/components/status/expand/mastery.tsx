import Decimal from "decimal.js";
import * as React from "react";
import table from "components/common/table.styl";
import { FormattedMessage } from "react-intl";

type Props = {
    perMastery: {
        value?: Decimal.Value
        ratio?: Decimal.Value
    }
    mastery: number
    name: React.ReactNode
    digit?: number
}

const mastery: React.FC<Props> = props => {
    const value = React.useMemo(() => {
        return props.perMastery.value ?? props.perMastery.ratio!;
    }, [props.perMastery.value, props.perMastery.ratio]);

    return (
        <tr>
            <td><FormattedMessage id="app.mastery"/></td>
            <td>
                <span>{value.toString()}{props.perMastery.ratio ? "%" : null} x <span className={table.small}>{props.name}</span>{props.mastery}</span>
                <> = </>
                {new Decimal(value.toString()).times(props.mastery).cut(props.digit ?? 2, "floor").toString()}{props.perMastery.ratio ? "%" : null}
            </td>
        </tr>
    );
}

export default mastery;