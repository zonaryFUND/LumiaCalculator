import { WeaponTypeID } from "@app/entity/equipment";
import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";

const blue = {
    ...Constants.Q.damage,
    base: Constants.Q.damage.base.map((v, i) => v + Constants.Q.b.center_addition.base[i])
}

const table: DamageTable = {
    basicAttack: ["standard"],
    skill: [
        [
            {label: "Q黄赤/青中心部以外", skill: "Q", damage: Constants.Q.damage},
            {label: "Q青中心部", skill: "Q", damage: blue}
        ],
        [{label: "E", skill: "E", damage: Constants.E.damage}],
        [{label: "R", skill: "R", damage: Constants.R.damage}],
        [
            {label: "怒りのリス(黄赤)", skill: "T", damage: Constants.T.yr.damage},
            {label: "祝福のリス(赤青)", skill: "T", damage: Constants.T.rb.damage},
            {label: "魔法のリス(青黄)", skill: "T", damage: Constants.T.by.damage}
        ]
    ]   
}

export default table;