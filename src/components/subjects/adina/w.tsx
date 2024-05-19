import * as React from "react";
import Constants from "./constants.json";
import baseStyle from "components/tooltip/tooltip.module.styl";
import style from "./adina.module.styl";
import Value from "components/tooltip/value";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";

const w: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した位置に天体をつなぐ三角形を描きます。的中した敵に
            <Value skill="W" ratio={Constants.W.damage} />のスキルダメージを与え、移動速度を
            {Constants.W.slow.duration}秒間{Constants.W.slow.effect}減少させます。<br />
            <br />
            <span className={baseStyle.emphasis}>天体追加効果</span><br />
            <span className={style.sun}>太陽</span>：ダメージ量が<Value skill="W" ratio={Constants.W.sun} />
            増加します。<br />
            <span className={style.moon}>月</span>：的中した敵を{Constants.W.moon}秒間気絶させます。<br />
            <span className={style.star}>星</span>：三角形を描く速度が速くなり、範囲内の味方に
            {Constants.W.star.duration}秒間
            <Value skill="W" ratio={Constants.W.star.shield} />のシールドを与えます。<br />
            <br />
            <span className={style.moon}>月コンジャンクション効果</span>：
            月が連続になると三角形が2回描かれ、それぞれ<Value skill="R" ratio={Constants.R.moon_conjunction} />
            のスキルダメージを与えます。1回目の三角形は対象を{Constants.W.conjunction.stun}
            秒間気絶させ、2回目の三角形は対象の移動速度を{Constants.W.conjunction.slow.duration}秒間
            {Constants.W.conjunction.slow.effect}減少させます。
        </>
    )
}

export default w;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.W.damage.base},
        {title: "シールド吸収量", values: Constants.W.star.shield.base},
        {title: "クールダウン", values: Constants.W.cooldown},
        {title: "消費", values: Constants.W.sp_cost}
    ]
}
