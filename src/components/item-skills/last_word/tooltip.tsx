import * as React from "react";
import Constants from "./constants.json";
import style from "components/tooltip/tooltip.module.styl";
import { ItemSkillProps } from "../item-skill";
import Value from "../value";
import { useValueContextOptional } from "components/tooltip/value-context";
import { calculateValue } from "app-types/value-ratio/calculation";

const description: React.FC<ItemSkillProps> = props => {
    const { config, status, showEquation } = useValueContextOptional();
    const value = (() => {
        if (config && status && !showEquation) {
            const ampValue = calculateValue({amp: Constants.ad.amp}, status, config, "other").static;
            return <><span className={style.amp}>({ampValue.toString()})</span>+<span className={style.maxhp}>敵最大体力の{Constants.ad.targetMaxHP}%</span></>;
        } else {
            return <Value ratio={Constants.ad} overrideExpression={{result: {className: style.amp}}} />;
        }
    })();

    return (
        <p>
            最後の弾丸で加える基本攻撃が攻撃力が{value}に値する追加スキルダメージを与え、与えたダメージの
            <span className={style.emphasis}>{Constants.lifesteal_ratio}%</span>を体力に回復します。
        </p> 
    );
};

export default description;