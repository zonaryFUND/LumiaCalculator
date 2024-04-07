import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        指定した位置に{Constants.W.duration}秒間持続する不安定なガラス壁を作り上げます。敵が衝突するとガラス壁が崩れ、衝突した敵を
        {Constants.W.stun[props.config.skillLevels.W]}秒間気絶させて<Damage skill="W" constants={Constants.W.damage} {...props} />のスキルダメージを与えます。<br />
        ガラス壁は崩れた後、両端に<span className={style.emphasis}>ガラス破片</span>を生成します。
    </>
);

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "気絶持続時間", values: Constants.W.stun},
        {title: "クールダウン", values: Constants.W.cooldown}
    ]
}