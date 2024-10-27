import { SkillLevels } from "app-types/subject-dynamic/config";
import { DamageTable, DamageTableGenerator } from "../damage-table";
import Constants from "./constants.json";

const table: DamageTableGenerator = props => {
    const wCount = props.status.defense.additional?.dividedBy(Constants.W.additional_hit_per__additional_defense).floor()
        .add(Constants.W.count).toNumber() ?? 0;

    return {
        basicAttack: ["standard"],
        skill: [
            [{label: "Q", skill: "Q", value: Constants.Q.damage}],
            [
                {label: props.intl.formatMessage({id: "subject.magnus.w-1hit"}), skill: "W", value: Constants.W.damage},
                {label: props.intl.formatMessage({id: "subject.magnus.w-max-hit"}, {value: wCount}), skill: "W", value: Constants.W.damage, multiplier: wCount * 100}
            ],
            [{label: "E", skill: "E", value: Constants.E.damage}],
            [{label: "R", skill: "R", value: Constants.R.damage}]
        ]   
    }
}

export default table;