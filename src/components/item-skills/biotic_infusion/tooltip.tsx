import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Damage from "../damage";

const description: React.FC<ItemSkillProps> = props => {
    const baseStyle = props.values.dmg.melee?.targetMaxHP != undefined ? style.level : undefined;
    const className = props.values.dmg.amp ? style.amp :
        props.values.dmg.level ? style.level :
        style.maxhp;

    return (
        <p>
            スキルを使用すると意念をチャージします。チャージした状態で次の{Constants.time_bound}秒以内に行われる基本攻撃は
            <Damage {...props} values={props.values.dmg} baseClassName={baseStyle} className={className} />の追加スキルダメージを与えます。(クールダウン：{Constants.cooldown}秒)
        </p> 
    );
};

export default description;
