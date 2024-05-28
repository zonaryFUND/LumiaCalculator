import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import Damage from "../damage";
import { ItemSkillProps } from "../item-skill";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        着用者の体力が{Constants.threshold}%以下の時に敵実験体からダメージを受けると、{Constants.guard_duration}秒間
        <Damage {...props} values={Constants.shield} className={style.level} />のシールドと
        {Constants.tenacity}%の妨害耐性を獲得します。
        また、{Constants.adaptive_duration}秒間<span className={style.attack}>攻撃力が{Constants.adaptive}</span>または
        <span className={style.amp}>スキル増幅が{Constants.adaptive * 2}</span>
        増加します。受ける回復量も{Constants.heal}%増加します。（クールダウン：{Constants.cooldown}秒）
    </p> 
);

export default description;
