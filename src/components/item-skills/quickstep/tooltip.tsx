import * as React from "react";
import Constants from "./constants.json";

type Props = {
    values: any
}

const description: React.FC<Props> = props => {
    return (
        <p>
            敵実験体に個別ダメージを的中させるたびに{Constants.duration}秒間移動速度が{Constants.movement_speed}
            %増加するスタックを獲得します。(最大{Constants.max_stack}スタック)
        </p> 
    );
}

export default description;