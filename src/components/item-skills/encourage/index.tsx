import * as React from "react";
import Constants from "./constants.json";
import style from "../item-skills.styl";

const Value: React.FC = _ => (
    <>{Constants.adaptive.base}<span className={style.level}>(+キャラクターレベル*{Constants.adaptive.perLevel})</span></>
)

const description: React.FC = _ => (
    <p>
        味方に治癒またはシールドスキルを適用させた場合、自分以外に適用させた対象の適合能力値を{Constants.duration}秒間<Value />、
        攻撃速度を{Constants.as}％増加させます。
    </p> 
);

export default description;