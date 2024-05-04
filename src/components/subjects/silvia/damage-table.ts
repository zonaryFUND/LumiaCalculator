import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const bikeEMax = {
    base: Constants.BikeE.damage.base.map((v, i) => v + Constants.BikeE.ms_max_damage[i]),
    amp: Constants.BikeE.damage.amp
}

const table: DamageTable = {
    basicAttack: [
        "standard",
        {label: "Rバイク降車後追加ダメージ", skill: "R", damage: Constants.BikeR.damage}
    ],
    skill: [
        [
            {label: "人間Qダメージ", skill: "Q", damage: Constants.HumanQ.damage},
            {label: "人間Q回復", skill: "Q", damage: Constants.HumanQ.heal, type: "heal"},
        ],
        [{label: "人間W", skill: "W", damage: Constants.HumanW.damage}],
        [
            {label: "人間E最小値", skill: "E", damage: Constants.HumanE.min_damage},
            {label: "人間E最大値", skill: "E", damage: Constants.HumanE.max_damage},
        ],
        [{label: "バイクQ", skill: "Q", damage: Constants.BikeQ.damage}],
        [{label: "バイクW", skill: "W", damage: Constants.BikeW.damage}],
        [
            {label: "バイクE最小値", skill: "E", damage: Constants.BikeE.damage},
            {label: "バイクE最大値", skill: "E", damage: bikeEMax}
        ]
    ]   
}

export default table;