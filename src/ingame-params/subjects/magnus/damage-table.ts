import { SkillLevels } from "core/subject-dynamic/config";
import { DamageTable, DamageTableGenerator } from "../type";
import Constants from "./constants";

const table: DamageTableGenerator = props => {
    const wCount = props.status.defense.additionalValue?.dividedBy(Constants.W.additional_hit_per__additional_defense).floor()
        .add(Constants.W.count).toNumber() ?? 0;

    return {
        basicAttack: ["standard"],
        skill: [
            [{ label: "Q", origin: "Q", value: Constants.Q.damage }],
            [
                { label: props.intl.formatMessage({ id: "subject.magnus.w-1hit" }), origin: "W", value: Constants.W.damage },
                { label: props.intl.formatMessage({ id: "subject.magnus.w-max-hit" }, { value: wCount }), origin: "W", value: Constants.W.damage, multiplier: wCount * 100 }
            ],
            [
                { label: "E", origin: "E", value: Constants.E.damage },
                { label: "E壁ドン", origin: "E", value: Constants.E.wall_damage }
            ],
            [{ label: "R", origin: "R", value: Constants.R.damage }]
        ]
    }
}

export default table;