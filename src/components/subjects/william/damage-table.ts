import { DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const qt = Constants.Q.damage.attack[props.skillLevels.Q] + Constants.T.damage.attack[props.skillLevels.T] - 100;

    return {
        basicAttack: [
            "standard",
            {label: props.intl.formatMessage({id: "subject.william.aa-during-q"}), skill: "Q", value: Constants.Q.damage, type: "basic"},
            {label: props.intl.formatMessage({id: "subject.william.aa-after-t"}), skill: "T", value: Constants.T.damage, type: "basic"},
            {label: props.intl.formatMessage({id: "subject.william.aa-after-t-during-q"}), skill: "Q", value: {attack: qt, basicAttackAmp: 100}, type: "basic"},
        ],
        skill: [
            [  
                {label: "W", skill: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.william.w-2hit"}), skill: "W", value: Constants.W.damage, multiplier: [{basic: 200}]}
            ],
            [{label: "R", skill: "R", value: Constants.R.damage}]
        ]   
    } 
}


export default table;