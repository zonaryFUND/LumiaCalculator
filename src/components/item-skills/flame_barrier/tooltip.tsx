import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";
import Damage from "../damage";

const description: React.FC<ItemSkillProps> = props => (
    <p>
        戦闘に突入すると秒ごとに周り{Constants.area}mの敵に<Damage {...props} values={props.values.dmg} className={style.maxhp} />のスキルダメージを与えます。<br />
    </p> 
);

export default description;