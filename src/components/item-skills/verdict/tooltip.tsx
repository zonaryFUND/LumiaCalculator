import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

const description: React.FC = _ => (
    <p>
        防御貫通を{Constants.penetration_threshold}以上獲得した場合に発動します。<br />
        敵実験体にダメージを与えて対象の体力を<span className={style.maxhp}>{Constants.hp_threshold}％</span>以下にさせた場合には
        対象がすぐに死亡します。(クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;