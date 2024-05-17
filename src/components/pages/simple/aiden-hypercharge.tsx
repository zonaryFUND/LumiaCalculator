import { Status } from "components/subject/status";
import * as React from "react";
import { useToggle } from "react-use";
import Constants from "components/subjects/aiden/constants.json";
import { BaseCriticalDamagePercent } from "components/subject/standard-values";
import InnerTable from "components/common/inner-table";
import table from "components/common/table.styl";
import style from "./damage-table.module.styl";
import { SubjectConfig } from "app-types/subject-dynamic/config";

type Props = {
    status: Status
    config: SubjectConfig
}

const hypercharge: React.FC<Props> = props => {
    const [expand, toggleExpand] = useToggle(false);

    const conversion = Constants.T.critical_chance_convert[props.config.skillLevels.T];
    const convertedRatio = props.status.criticalChance.times(conversion);

    const base = props.status.attackPower.addPercent(props.status.basicAttackAmp).floor();
    const value = (() => {
        const multiplier = BaseCriticalDamagePercent.minus(Constants.T.critical_damage).add(convertedRatio);
        return base.addPercent(multiplier);
    })();

    return (
        <>
            <tr onClick={toggleExpand}>
                <td>ハイパーチャージ中基本攻撃</td>
                <td className={style.basic}>-</td>
                <td className={style.basic}>{value.toString()}</td>
                <td className={style.basic}>{value.toString()}</td>
            </tr>
            {
                expand ?
                <tr className={table.expand}><td colSpan={4}>
                    <InnerTable>
                        <tr><td>基礎値</td><td>{base.toString()}</td></tr>
                        <tr><td>追加ダメージ</td><td>
                        <><span>致命打基本値</span>{BaseCriticalDamagePercent.toString()}％ - </>
                        <><span>T基本補正</span>{Constants.T.critical_damage}％<br /></>
                        <> + <span>T致命打確率変換</span>({props.status.criticalChance.toString()}％ x {conversion}％) </>
                        <> + <span>致命打ダメージ上昇</span>{props.status.criticalDamage.toString()}％</>
                        </td></tr>
                    </InnerTable>
                </td></tr>
                : null
            }
        </>
    )
};

export default hypercharge;