import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const q: React.FC<SubjectSkillProps> = props => (
    <>
        ジェニーが対象地点をスポットライトで{Constants.Q.count}回照らして、それぞれ
        <Damage skill="Q" constants={Constants.Q.damage} {...props} />のスキルダメージを与えます。<br />
        敵をスポットライトで照らした場合にはこのスキルのクールダウンが{Constants.Q.cooldown_reduction}秒減少し、ジェニー自身を照らす場合、追加効果を獲得します。<br />
        <br />
        <span className={style.strong}>赤ワイン</span>：{Constants.Q.buff_duration}秒間攻撃速度が{Constants.Q.red_attack_speed}
        ％増加します。(最大{Constants.Q.max_stack}スタック)<br />
        <span className={style.strong}>ブラックティー</span>：{Constants.Q.buff_duration}秒間移動速度が{Constants.Q.black_movement_speed}
        ％増加します。(最大{Constants.Q.max_stack}スタック)
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