import * as React from "react";
import Damage from "../damage";
import { SubjectSkillProps } from "../props";
import Constants from "./constants.json";
import { ValuesProps } from "../values";

const maxShield = {
    base: Constants.W.shield.base.map(v => v * (100 + Constants.W.max_shield) / 100),
    amp: Constants.W.shield.amp * (100 + Constants.W.max_shield) / 100
}

const w: React.FC<SubjectSkillProps> = props => (
    <>
        キアラは失った体力に比例する<Damage skill="W" constants={Constants.W.shield} {...props} /> ~ <Damage skill="W" constants={maxShield} {...props} />
        のシールドを生成して{Constants.W.duration}秒間維持させる事ができます。<br />
        {Constants.W.reuse}秒後、シールドが残っている場合にはスキルを再び使用してシールドを爆発させる事ができます。<br />
        シールドが爆発する時には範囲内の敵に<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えます。
    </>
)

export default w;

export const values: ValuesProps = {
    additionalInfo: <>キアラの体力が{Constants.W.max_shield_hp}％の時、失った体力比例増幅最大値が({Constants.W.max_shield}％)に適用されます。</>,
    parameters: [
        {title: "シールド吸収量", values: Constants.W.shield.base},
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "最大体力ダメージ(％)", values: Constants.W.damage.targetMaxHP, percent: true},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}