import * as React from "react";
import Constants from "./constants.json";
import Value from "components/tooltip/value";
import { ValuesProps } from "../../tooltip/subject-skill/expansion-values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => (
    <>
        指定した位置に{Constants.W.duration}秒間持続する不安定なガラス壁を作り上げます。敵が衝突するとガラス壁が崩れ、衝突した敵を
        {Constants.W.stun[props.skillLevel]}秒間気絶させて<Value skill="W" ratio={Constants.W.damage} {...props} />のスキルダメージを与えます。<br />
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