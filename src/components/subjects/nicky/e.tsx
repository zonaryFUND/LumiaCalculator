import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";
import style from "components/tooltip/tooltip.module.styl";

const e: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            <span className={style.emphasis}>強力なパンチ</span>：ニッキーが強力なパンチで前方の敵に
            <Damage skill="E" constants={Constants.E.damage} {...props} />のスキルダメージを与え、{Constants.E.slow.duration}
            秒間移動速度を{Constants.E.slow.effect}％減少させます。<br />
            <br />
            <span className={style.emphasis}>怒りのパンチ！</span>：ガードに成功すると、怒りを込めたパンチが使用できます。怒りのパンチ！は前方の敵に
            <Damage skill="E" constants={Constants.E.e2_damage} {...props} />のスキルダメージを与えて{Constants.E.slow.duration}
            秒間移動速度を{Constants.E.slow.effect}％減少させ、{Constants.E.stun}秒間気絶させます。<br />
            <br />
            <span className={style.emphasis}>強力なパンチ</span>と<span className={style.emphasis}>怒りのパンチ！</span>はクールダウンを共有しません。
        </>
    );
}

export default e;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.E.damage.base},
        {title: "強化されたダメージ量", values: Constants.E.e2_damage.base},
        {title: "強力なパンチクールダウン", values: Constants.E.cooldown}
    ]
}
