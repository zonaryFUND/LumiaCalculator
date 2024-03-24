import * as React from "react";
import style from "../item-skills.styl";
import Constants from "./constants.json";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => {
    return (
        <>
            <span className={style.level}>キャラクターレベル＊{props.values.dmg.perLevel}</span>
            {props.values.dmg.amp ? <span className={style.amp}>(+スキル増幅の{props.values.dmg.amp}％)</span> : null}
        </>
    )
};

const description: React.FC<Props> = props => (
    <p>
        次に与える基本攻撃が{props.values.dmg ? <><Value {...props} />の追加スキルダメージを与え、</> : null}
        {props.values.slow.duration}秒間移動速度を{props.values.slow.effect}％減少させます。（クールダウン：{Constants.cooldown}秒）
    </p> 
);

export default description;