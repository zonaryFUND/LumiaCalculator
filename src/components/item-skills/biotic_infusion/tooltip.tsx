import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Damage from "../value";

const description: React.FC<ItemSkillProps> = props => {
    const [rangeClassName, overrideClass] = (() => {
        if (props.values.dmg.melee?.targetMaxHP != undefined) {
            return [{base: style.level, range: style.maxhp}, undefined];
        }
        if (props.values.dmg.level) {
            return [undefined, {result: {className: style.level}}];
        }
        if (props.values.dmg.amp) {
            return [undefined, {result: {className: style.amp}}];
        }
        return [undefined, undefined];
    })();

    return (
        <p>
            スキルを使用すると意念をチャージします。チャージした状態で次の{Constants.time_bound}秒以内に行われる基本攻撃は
            <Damage {...props} ratio={props.values.dmg} rangeClassName={rangeClassName} overrideExpression={overrideClass} />の追加スキルダメージを与えます。(クールダウン：{Constants.cooldown}秒)
        </p> 
    );
};

export default description;
