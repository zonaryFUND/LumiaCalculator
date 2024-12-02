import { DamageTableGenerator } from "../type";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const qt = Constants.Q.damage.attack[props.config.skillLevels.Q] + Constants.T.damage.attack[props.config.skillLevels.T] - 100;

    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.william.aa-during-q"}), skill: "Q", value: Constants.Q.damage, type: {type: "basic"}},
            {label: props.intl.formatMessage({id: "subject.william.aa-after-t"}), skill: "T", value: Constants.T.damage, type: {type: "basic"}},
            {label: props.intl.formatMessage({id: "subject.william.aa-after-t-during-q"}), skill: "Q", value: {attack: qt, basicAttackAmp: 100}, type: {type: "basic"}},
        ],
        skill: [
            [  
                {label: "W", skill: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.william.w-2hit"}), skill: "W", value: Constants.W.damage, multiplier: 200}
            ],
            [{label: "R", skill: "R", value: Constants.R.damage}]
        ]   
    } 
}


export default table;