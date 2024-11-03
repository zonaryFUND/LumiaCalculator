import { DamageTable, DamageTableGenerator, SubjectDamageTableUnit } from "../damage-table";
import Constants from "./constants.json";

const bikeEMax = {
    base: Constants.BikeE.damage.base.map((v, i) => v + Constants.BikeE.ms_max_damage[i]),
    amp: Constants.BikeE.damage.amp
}

const table: DamageTableGenerator = props => ({
    basicAttack: [
        "standard",
        {label: props.intl.formatMessage({id: "subject.silvia.r-additional"}), skill: "R", value: Constants.BikeR.damage}
    ],
    skill: [
        [
            {label: props.intl.formatMessage({id: "subject.silvia.humanq-damage"}), skill: "Q", value: Constants.HumanQ.damage},
            {label: props.intl.formatMessage({id: "subject.silvia.humanq-heal"}), skill: "Q", value: Constants.HumanQ.heal, type: {type: "heal", target: "ally"}},
        ],
        [{label: props.intl.formatMessage({id: "subject.silvia.humanw"}), skill: "W", value: Constants.HumanW.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.silvia.humane-min"}), skill: "E", value: Constants.HumanE.min_damage},
            {label: props.intl.formatMessage({id: "subject.silvia.humane-max"}), skill: "E", value: Constants.HumanE.max_damage},
        ],
        [{label: props.intl.formatMessage({id: "subject.silvia.bikeq"}), skill: "Q", value: Constants.BikeQ.damage}],
        [{label: props.intl.formatMessage({id: "subject.silvia.bikew"}), skill: "W", value: Constants.BikeW.damage}],
        [
            {label: props.intl.formatMessage({id: "subject.silvia.bikee-min"}), skill: "E", value: Constants.BikeE.damage},
            {label: props.intl.formatMessage({id: "subject.silvia.bikee-max"}), skill: "E", value: bikeEMax}
        ]
    ]   
})

export default table;