import * as React from "react";

type Props = {
    values: any
}

const description: React.FC<Props> = props => (
    <p>
        スキルで敵にダメージを与えると、{props.values.duration}秒間移動速度を{props.values.slow}％
        {props.values.as ? <>、攻撃速度を{props.values.as}％</> : null}
        減少させます。（クールダウン：{props.values.cooldown}秒）
    </p> 
);

export default description;