import * as React from "react";
import style from "components/tooltip/tooltip.module.styl";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import { calculateValue } from "app-types/value-ratio/calculation";

const description: React.FC<ItemSkillProps> = props => {
    const { config, status, showEquation } = useValueContextOptional();
    const damage = (() => {
        if (config && status && !showEquation) {
            return calculateValue(props.values.dmg, status, config, "other").toString();
        } else {
            return null;
        }
    })();
    return (
        <p>
            <span className={style["vf-overflow"]}>VF暴走</span>状態の時、
            戦闘に突入すると秒ごとに周り{Constants.area}mの敵に
            {damage ? <><span className={style.maxhp}>{damage}</span>の</> : null}
            スキルダメージを与えます。<br />
            {damage ? null :  <>敵に<span className={style.maxhp}>最大体力の{props.values.dmg.maxHP}%</span>のスキルダメージを与えます。<br /></>}
            <br />
            <span className={style["vf-overflow"]}>VF暴走</span>状態の場合はブラックマンバキングの<span className={style.strong}>炎の結界</span>のみ発動します。
        </p> 
    )
};

export default description;