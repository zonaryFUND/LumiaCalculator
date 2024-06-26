import * as React from "react";
import Value from "components/tooltip/value";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const dict = {
    summonedAttack: {
        format: "セントリーガンの攻撃力の{ratio}%"
    }
}

const w: React.FC<SubjectSkillProps> = props => (
    <>
        バーバラが高出力砲身でイオンレーザーを発射し、経路上の敵に<Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与えて
        {Constants.W.slow.duration}秒間移動速度を{Constants.W.slow.effect}%減少させます。<br />
        <span className={style.emphasis}>イオンレーザー</span>が的中した最初の敵実験体は{Constants.W.target_duration}秒間セントリーガンの<span className={style.emphasis}>標的</span>
        になります。バーバラが<span className={style.emphasis}>イオンレーザー</span>を使用すると、セントリーガンがチャージされ、敵にレールガンを発射して
        <Value skill="W" ratio={Constants.W.sentry_damage} overrideExpression={dict} />のスキルダメージを与えます。レールガンは最大{Constants.W.sentry_railgun_ammo}発装填することができます。
    </>
)

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "セントリーガンレールガンダメージ量", values: Constants.W.sentry_damage.base},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}