import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const maxConstant = {
    base: Constants.W.damage.base.map(v => v * 2),
    attack: Constants.W.damage.attack * 2
};

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            エイデンが武器に電流を集めて次の攻撃を準備し、移動速度が若干減少します。<br />
            再使用すると、周りの敵にチャージ時間に応じて
            <Value skill="W" ratio={Constants.W.damage} /> ~ <Value skill="W" ratio={maxConstant} />
            のスキルダメージを与え、移動速度を
            {Constants.W.slow.duration}秒間{Constants.W.slow.effect}%減少させます。最大チャージ時、範囲の端に
            {Constants.W.field_duration}秒間維持される<span className={style.emphasis}>電場</span>を残します。<br />
            <br />
            <span className={style.emphasis}>電場</span>：電場に触れる敵は
            <Value skill="W" ratio={Constants.W.field_damage} />のスキルダメージを受けて
            {Constants.W.bind[props.skillLevel]}秒間束縛されます。
        </>
    );
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.W.damage.base},
        {title: "最大ダメージ量", values: maxConstant.base},
        {title: "追加ダメージ量", values: Constants.W.field_damage.base},
        {title: "束縛持続時間", values: Constants.W.bind},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}