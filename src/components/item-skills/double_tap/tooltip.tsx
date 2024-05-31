import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import Value from "../value";
import { ItemSkillProps } from "../item-skill";

const description: React.FC<ItemSkillProps> = props => (
    <p>最後の弾丸で加える基本攻撃が攻撃力が<Value ratio={Constants.ad} overrideExpression={{result: {className: style.amp}}} />に値する追加スキルダメージを与えます。</p> 
);

export default description;