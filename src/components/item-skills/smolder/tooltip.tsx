import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";

type Props = {
    values: any
}

const Value: React.FC<Props> = props => {
    return (
        <span className={style.maxhp}>対象最大体力の{props.values.dmg.enemyMaxHP}%</span>
    )
};

const description: React.FC<Props> = props => (
    <p>
        基本攻撃対象に最大{Constants.max_stack}回までスタックできる[燃える苦痛]効果を{Constants.duration}秒間付与します。
        [燃える苦痛]は秒ごとに<Value {...props} />に値する固定ダメージを与えます。
    </p> 
);

export default description;