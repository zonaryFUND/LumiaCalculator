import * as React from "react";
import Constants from "./constants.json";

const description: React.FC = _ => (
    <p>
        追加体力を{Constants.threshold_maxhp}以上獲得した場合に発動します。<br />
        発動中、{Constants.time_bound}秒間敵実験体から受けたダメージが{Constants.threshold_damage}以上になると、
        {Constants.duration}秒間周り{Constants.area}以内の敵実験体の攻撃速度を{Constants.as}％減少させ、
        自分の妨害耐性は{Constants.tenacity}％増加します。（クールダウン：{Constants.cooldown}秒）
    </p> 
);

export default description;