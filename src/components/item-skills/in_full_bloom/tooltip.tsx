import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Damage from "../damage";

const Value: React.FC<ItemSkillProps> = props => {
    if (props.config && props.showEquation != true) {
        const added = props.config.level * Constants.damage.level;
        return <><span className={style.emphasis}>{Constants.damage.base}</span><span className={style.level}>(+{added})</span></>
    } else {
        return <Damage {...props} values={Constants.damage} />;
    } 
};

const description: React.FC<ItemSkillProps> = props  => (
    <p>
        敵実験体に{Constants.threshold}回連続で基本攻撃を与えると<Value {...props} />の追加スキルダメージを与えます。
        <br />
        (クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;