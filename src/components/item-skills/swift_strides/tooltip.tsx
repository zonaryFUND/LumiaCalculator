import * as React from "react";
import Constants from "./constants.json";
import Value from "../value";

type Props = {
    values: any
}

const description: React.FC<Props> = props => (
    <p>
        {Constants.distance_per_stack}m移動するたびに[軽い足取り]を最大{Constants.max_stack}スタックまで獲得できます。<br />
        スタック数に応じて固有移動速度を最大{props.values.ms}まで獲得します。基本攻撃ダメージを与える場合、スタックをすべて消費して最大<Value ratio={props.values.dmg} />のスキルダメージを与えます。
        {
            props.values.slow ?
            <><br />(近距離)最大スタック状態ではダメージを受けた対象の移動速度を{props.values.slow.duration}秒間{props.values.slow.effect}%減少させます。</> :
            null
        }
    </p> 
);

export default description;