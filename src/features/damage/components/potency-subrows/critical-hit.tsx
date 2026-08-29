import Decimal from "decimal.js";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import table from "components/common/table.module.styl";
import { BaseCriticalDamagePercent } from "core/subject-dynamic/status/standard-values";

type Props = {
    /**
     * 非致命打威力
     */
    regularDamage: Decimal

    /**
     * 致命打威力
     */
    criticalDamage: Decimal

    /**
     * 致命打追加ダメージ（％）
     */
    criticalDamageAdditionalRatio: Decimal
}

/**
 * 致命打ダメージの計算式行
 */
const criticalHit: React.FC<Props> = props => {
    const standardCriticalHitDamage = BaseCriticalDamagePercent.add(100);
    return (
        <tr>
            <td><FormattedMessage id="app.critical-hit" /></td>
            <td>
                {props.regularDamage.toString()}
                <> x </>
                ({standardCriticalHitDamage.toString()}% + <span className={table.small}><FormattedMessage id="status.critical-damage" /></span>{props.criticalDamageAdditionalRatio.toString()}%)
                <> = </>
                {props.criticalDamage.toString()}
            </td>
        </tr>
    );
}

export default criticalHit;
