import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>格闘アクション</span>：ニッキーが拳に力を溜め、移動速度が{Constants.Q.movement_speed_penalty}
            ％減少します。再び使用すると突進し、初めて的中した敵を少し突き飛ばして
            <Damage skill="Q" constants={Constants.Q.min_damage} {...props} /> ~ <Damage skill="Q" constants={Constants.Q.max_damage} {...props} />
            のスキルダメージを与えます。敵に的中した場合、クールダウンが{Constants.Q.cooldown_reduction}％減少し、リバーブロースキルを使用できるようになります。<br />
            <br />
            <span className={style.emphasis}>リバーブロー</span>：前方範囲の敵に
            <Damage skill="Q" constants={Constants.Q.q2_damage} {...props} />のスキルダメージを与え、的中した敵1人あたり
            <Damage skill="Q" constants={Constants.Q.rage} {...props} />の怒りを獲得します。
        </>
    );
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "最小ダメージ量", values: Constants.Q.min_damage.base},
        {title: "最大ダメージ量", values: Constants.Q.max_damage.base},
        {title: "範囲ダメージ量", values: Constants.Q.q2_damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
