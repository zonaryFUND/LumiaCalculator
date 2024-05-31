import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Value from "../value";
import { useValueContextOptional } from "components/tooltip/value-context";

const Damage: React.FC<ItemSkillProps> = props => {
    const { config, showEquation } = useValueContextOptional();
    if (config && !showEquation) {
        const added = config.level * Constants.damage.level;
        return <><span className={style.emphasis}>{Constants.damage.base}</span><span className={style.level}>(+{added})</span></>
    } else {
        return <Value ratio={Constants.damage} />;
    } 
};

const description: React.FC<ItemSkillProps> = props  => (
    <p>
        敵実験体に{Constants.threshold}回連続で基本攻撃を与えると<Damage {...props} />の追加スキルダメージを与えます。
        <br />
        (クールダウン：{Constants.cooldown}秒)
    </p> 
);

export default description;