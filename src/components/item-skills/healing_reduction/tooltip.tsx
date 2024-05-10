import * as React from "react";
import Constants from "./constants.json";
import { ItemSkillProps } from "../item-skill";

type Props = {
    intensity: "strong" | "weak"
}

const description: React.FC<ItemSkillProps & Props> = props => (
    <p>
        相手にダメージを与えるとダメージを受けた対象の治癒効果が{Constants.duration}秒間
        {props.intensity == "strong" ? Constants.effect_strong : Constants.effect_weak}％減少します。
    </p> 
);

export default description;