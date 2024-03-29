import * as React from "react";
import Constants from "./constants.json";
import Damage from "../damage";
import baseStyle from "components/tooltip/tooltip.module.styl";
import style from "./adina.module.styl";
import { ValuesProps } from "../values";
import { SubjectSkillProps } from "../props";

const q: React.FC<SubjectSkillProps> = props => {
    return (
        <>
            指定した方向に天体を発射し、的中した敵に<Damage {...props} skill="Q" constants={Constants.Q.damage} />
            のスキルダメージを与えます。<br />
            <br />
            <span className={baseStyle.emphasis}>天体追加効果</span><br />
            <span className={style.sun}>太陽</span>：ダメージ量が<Damage {...props} skill="Q" constants={Constants.Q.sun} />
            増加します。<br />
            <span className={style.moon}>月</span>：1人のみ的中され、{Constants.Q.moon}秒間気絶させます。<br />
            <span className={style.star}>星</span>：彗星が素早く飛んでいき、経路上に
            {Constants.Q.star.duration}秒間尾を残して味方の移動速度を
            {Constants.Q.star.movement_speed}増加させます。<br />
            <br />
            <span className={style.sun}>太陽コンジャンクション効果</span>：
            太陽が連続して並ぶと、より大きな太陽を発射して<Damage {...props} skill="R" constants={Constants.R.sun_conjunction} />
            のスキルダメージを与え、
            {Constants.Q.conjunction.duration}秒間
            <span className={baseStyle.maxhp}>対象の最大体力の{Constants.Q.conjunction.damage.targetMaxHP}％</span>
            の持続ダメージで敵を燃やします。
        </>
    )
}

export default q;

export const values: ValuesProps = {
    parameters: [
        {title: "ダメージ量", values: Constants.Q.damage.base},
        {title: "クールダウン", values: Constants.Q.cooldown},
        {title: "消費", values: Constants.Q.sp_cost}
    ]
}
