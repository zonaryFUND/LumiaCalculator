import { DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => {
    const qt = Constants.Q.damage.attack[props.config.skillLevels.Q] + Constants.T.damage.attack[props.config.skillLevels.T] - 100;

    return {
        basicAttack: [
            "standard",
            { label: props.intl.formatMessage({ id: "subject.william.aa-during-q" }), origin: "Q", value: Constants.Q.damage, type: { type: "basic" } },
            { label: props.intl.formatMessage({ id: "subject.william.aa-after-t" }), origin: "T", value: Constants.T.damage, type: { type: "basic" } },
            { label: props.intl.formatMessage({ id: "subject.william.aa-after-t-during-q" }), origin: "Q", value: { attack: qt, basicAttackAmp: 100 }, type: { type: "basic" } },
        ],
        skill: [
            [
                { label: "W", origin: "W", value: Constants.W.damage },
                { label: props.intl.formatMessage({ id: "subject.william.w-2hit" }), origin: "W", value: Constants.W.damage, multiplier: 200 }
            ],
            [{ label: "R", origin: "R", value: Constants.R.damage }]
        ]
    }
}


export default table;