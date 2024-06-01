import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = props => {
    return (
        <p>
            {Constants.threshold}秒以上自分の周り{Constants.area}m以内にいた敵実験体には、基本攻撃が強化され、
            <Value ratio={Constants.damage} overrideExpression={{result: {className: style.amp}}} />
            の追加スキルダメージを与えます。強化された基本攻撃が敵に的中した場合、的中した対象に与える自分のスキルダメージ量が
            {Constants.skill_damage_enhance.duration}秒間{Constants.skill_damage_enhance.effect}%増加します。(クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;