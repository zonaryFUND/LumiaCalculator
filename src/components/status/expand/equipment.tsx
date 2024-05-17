import Decimal from "decimal.js";
import * as React from "react";
import style from "./expand.module.styl";
import table from "components/common/table.styl";
import { FormattedMessage } from "react-intl";

type Props = {
    constant?: Decimal
    perLevel?: Decimal
    percent?: boolean
    label?: React.ReactNode
    level: number
}

const subject: React.FC<Props> = props => {
    const constantOnly = React.useMemo(() => {
        return props.constant && props.perLevel == undefined;
    }, [props.constant, props.perLevel])

    const value = React.useMemo(() => {
        return (props.constant ?? new Decimal(0)).add(props.perLevel?.times(props.level) ?? 0) ?? 0;
    }, [props.constant, props.perLevel]);
    
    return (
        <tr><td>{props.label ?? <FormattedMessage id="app.equipment" />}</td><td>
            {constantOnly ? null : props.constant?.toString()}
            {props.constant && props.perLevel ? <> + </> : null}
            {props.perLevel ? <>{props.perLevel.times(props.level).toString()} <span className={style.multiply}>({props.perLevel.toString()} x <span className={table.small}>Lv</span>{props.level})</span></> : null}
            {constantOnly ? null : <> = </>}
            <>{value.toString()}{props.percent ? "％" : null}</>
        </td></tr>
    );
};

export default subject;