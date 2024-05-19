import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { Status } from "app-types/subject-dynamic/status/type";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        スピアを発射して経路上の敵に<Value skill="Q" ratio={Constants.Q.damage} />
        の基本攻撃ダメージを与え、到着地点にスピアを設置します。設置されたスピアはカーラと最大{Constants.Q.max}
        個までつながり、{Constants.Q.range}m以上離れるとつながりが切れ、{Constants.Q.duration}
        秒間地面に維持されます。貫通された2番目の対象からは<Value skill="Q" ratio={Constants.Q.second_damage} />のダメージを与えます。<br />
        <br />
        スピア貫通のクールダウンとキャスト時間が<span className={style.attackspeed}>攻撃速度(最大攻撃速度{Constants.T.max_attack_speed})</span>によって減少します。
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "合計攻撃力", values: Constants.Q.damage.attack, percent: true},
    ]
}

export function cooldownOverride(config: SubjectConfig, status: Status): (base: Decimal) => Decimal {
    // NOTE: This multiplier is an estimated value.
    return base => base.dividedBy(status.attackSpeed.calculatedValue).round2()
}