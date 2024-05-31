import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import { calculateValue } from "app-types/value-ratio/calculation";

const Value: React.FC<ItemSkillProps> = props => {
    const { config, status, showEquation } = useValueContextOptional();
    if (status && config && showEquation != true) {
        const value = calculateValue({amp: Constants.dmg.targetMaxHP.base}, status, config, "item");
        return (
            <span className={style.maxhp}>
                対象の最大体力の{Constants.dmg.targetMaxHP.base}<span className={style.amp}>(+{value.toString()})</span>%
            </span>
        );
    } else {
        return (
            <span className={style.maxhp}>
                対象の最大体力の{Constants.dmg.targetMaxHP.base}<span className={style.amp}>(+スキル増幅の{Constants.dmg.targetMaxHP.amp}%)</span>%
            </span>
        );
    }
}

const description: React.FC<ItemSkillProps> = props => (
    <p>
        スキル攻撃を的中した場合、敵に毎秒<Value {...props} />のスキルダメージを与えるデバフ効果を{Constants.duration}秒間付与します。
        (最大{Constants.max_stack}スタック)
    </p> 
);

export default description;