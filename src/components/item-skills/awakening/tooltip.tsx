import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            究極技を使用すると、
            {Constants.duration}秒間攻撃速度が<span className={style.emphasis}>{Constants.attack_speed}%</span>、移動速度が<span className={style.emphasis}>{Constants.movement_speed}%</span>増加し、衝突を無視します。<br />
            (クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;