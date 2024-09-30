import * as React from "react";
import Constants from "./constants.json";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            究極技を使用すると、
            {Constants.duration}秒間攻撃速度が{Constants.attack_speed}%、移動速度が{Constants.movement_speed}%増加し、衝突を無視します。<br />
            (クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;