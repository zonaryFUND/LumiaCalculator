import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";
import { RatioKeys } from "app-types/value-ratio";
import table from "components/common/table.module.styl";

type Props = {
    staticPotency?: Decimal
    dynamicPotencyDictionary?: { 
        [key in RatioKeys]: {ratio: number, value: Decimal, calculated: Decimal} 
    }
    sum: Decimal
}

const potency: React.FC<Props> = props => {
    const hasDynamicPotency = Object.keys(props.dynamicPotencyDictionary ?? {}).length > 0;
    const potencyDescription = (() => {
        const staticPotency = props.staticPotency ? 
            <React.Fragment key="static">
                { 
                    hasDynamicPotency ?
                    <span className={table.small}><FormattedMessage id="app.static-value" /></span> :
                    null
                }
                {props.staticPotency.toString()}
            </React.Fragment>
            : null

        return Object.entries(props.dynamicPotencyDictionary || {})
            .reduce((prev, [key, {ratio, value, calculated}]) => {
                const intlID = (() => {
                    switch (key) {
                        case "targetHP":        return "app.label.target-hp";
                        case "targetLostHP":    return "app.label.target-lost-hp";
                        case "lostHP":          return "app.label.lost-hp";
                        case "targetMaxHP":     return "app.label.target-maxhp";
                    }
                })();
                const element = <React.Fragment key={key}>
                    {prev.length > 0 ? <> + </> : null}
                    <span className={table.small}>
                        <FormattedMessage id={intlID} />
                    </span>
                    ({value.toString()} x {ratio.toString()}%)
                </React.Fragment>

                return prev.concat(element);
            }, staticPotency ? [staticPotency] : [])
    })();

    return (
        <tr>
            <td><FormattedMessage id="app.label.potency" /></td>
            <td>
                {potencyDescription}
                {props.dynamicPotencyDictionary ? <> = {props.sum.toString()}</> : null}
            </td>
        </tr>
    )
}

export default potency;