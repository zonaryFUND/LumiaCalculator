import * as React from "react";
import { useToggle } from "react-use";
import Constants from "components/subjects/aiden/constants.json";
import { BaseCriticalDamagePercent } from "components/subject/standard-values";
import InnerTable from "components/common/inner-table";
import table from "components/common/table.styl";
import style from "./damage-table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { FormattedMessage } from "react-intl";

type Props = {
    status: Status
    config: SubjectConfig
}

const hypercharge: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const conversion = Constants.T.critical_chance_convert[props.config.skillLevels.T];
    const convertedRatio = props.status.criticalChance.calculatedValue.times(conversion);

    const base = props.status.attackPower.calculatedValue.addPercent(props.status.basicAttackAmp.calculatedValue).floor();
    const value = (() => {
        const multiplier = BaseCriticalDamagePercent.minus(Constants.T.critical_damage).add(convertedRatio);
        return base.addPercent(multiplier);
    })();

    return (
        <>
            <tr onClick={toggleExpand}>
                <td><FormattedMessage id="subject.aiden.hypercharge-aa" /></td>
                <td className={style.basic}>-</td>
                <td className={style.basic}>{value.floor().toString()}</td>
                <td className={style.basic}>{value.floor().toString()}</td>
            </tr>
            {
                expand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr><td><FormattedMessage id="app.standard-value" /></td><td>{base.toString()}</td></tr>
                        <tr><td><FormattedMessage id="subject.aiden.hypercharge-additional" /></td><td>
                        <><span className={table.small}><FormattedMessage id="subject.aiden.critical-base" /></span>{BaseCriticalDamagePercent.toString()}% - </>
                        <><span className={table.small}><FormattedMessage id="subject.aiden.passive-penalty" /></span>{Constants.T.critical_damage}%<br /></>
                        <> + <span className={table.small}><FormattedMessage id="subject.aiden.passive-conversion" /></span>({props.status.criticalChance.calculatedValue.toString()}% x {conversion}%) </>
                        <> + <span className={table.small}><FormattedMessage id="status.critical-damage" /></span>{props.status.criticalDamage.calculatedValue.toString()}%</>
                        </td></tr>
                    </InnerTable>
                </td></tr>
                : null
            }
        </>
    )
};

export default hypercharge;