import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";
import Value from "../value";
import { useValueContextOptional } from "components/tooltip/value-context";

const description: React.FC<ItemSkillProps> = props => {
    const { showEquation } = useValueContextOptional();
    return (
        <p>
            スキル攻撃を加えると敵が{Constants.duration}秒間呪いの状態になります。
            呪い状態の敵は呪いの状態から解除される時、<Value ratio={props.values.dmg} overrideExpression={{result: {className: style.amp}}} />{showEquation ? "に値する" : "の"}固定ダメージを受けます。
            一度呪い状態になると{Constants.immune}秒間(基本攻撃を受けると{Constants.immuneReduction}秒減少)再び呪い状態になりません。(クールダウン：{Constants.cooldown}秒)
        </p> 
    );
}

export default description;