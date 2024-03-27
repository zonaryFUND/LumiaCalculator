import { Status } from "components/subject/use-status";
import * as React from "react";
import Constants from "./constants.json";
import { FormulaContext } from "../damage";
import style from "components/tooltip/tooltip.module.styl";

const t: React.FC<Status> = status => {
    const formula = React.useContext(FormulaContext);
    const attack = status.criticalChance.times(0.4).add(status.criticalDamage.times(0.8))

    return (
        <>
            つばめは基本攻撃の射程距離が<span className={style.emphasis}>{Constants.T.range}</span>に固定され、
            基本攻撃に致命打が発生しない代わりに
            {
                formula ?
                <>
                    致命打確率1%あたり<span className={style.emphasis}>{Constants.T.attack_per_critical_chance}</span>と
                    致命打ダメージ増加量1%あたり<span className={style.emphasis}>{Constants.T.attack_per_critical_damage}</span>
                    の攻撃力が増加します。                    
                </>
                :
                <>
                    致命打確率と致命打ダメージ増加量に応じて攻撃力が
                    <span className={style.emphasis}>{attack.toString()}</span>増加します。
                </>
            }
            <br />
            <br />
            <span className={style.emphasis}>変わり身の術</span>：つばめが
            <span className={style.emphasis}>霧隠れの術</span>と
            <span className={style.emphasis}>秘技 - 生死の刻印</span>を使用すると自分の位置に
            <span className={style.emphasis}>身代わり</span>を残します。
            <span className={style.emphasis}>身代わり</span>は{Constants.T.dummy_duration}秒間維持されます。
        </>
    );
}

export default t;
