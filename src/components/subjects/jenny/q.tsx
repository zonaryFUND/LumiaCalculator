import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ジェニーが対象地点をスポットライトで{Constants.Q.count}回照らして、それぞれ
        <Value skill="Q" ratio={Constants.Q.damage} />のスキルダメージを与えます。<br />
        敵をスポットライトで照らした場合にはこのスキルのクールダウンが{Constants.Q.cooldown_reduction}秒減少し、ジェニー自身を照らす場合、追加効果を獲得します。<br />
        <br />
        <span className={style.strong}>赤ワイン</span>：{Constants.Q.buff_duration}秒間攻撃速度が{Constants.Q.red_attack_speed}
        %増加します。(最大{Constants.Q.max_stack}スタック)<br />
        <span className={style.strong}>ブラックティー</span>：{Constants.Q.buff_duration}秒間移動速度が{Constants.Q.black_movement_speed}
        %増加します。(最大{Constants.Q.max_stack}スタック)
    </>
);

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost},
    ]
}