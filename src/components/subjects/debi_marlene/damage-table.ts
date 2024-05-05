import { DamageTable } from "../damage-table";
import Constants from "./constants.json";
import { Status } from "components/subject/status";
import { SkillLevels } from "components/subject/use-subject-config";

const marlW = {
    base: Constants.MarleneW.projectiles.base,
    additionalAttackSpeed: Constants.MarleneW.max_projectile,
    max: Constants.MarleneW.projectiles.base.map(v => v + Constants.MarleneW.max_projectile)
}

function table(props: {status: Status, skillLevels: SkillLevels}): DamageTable {
    const wBullet = props.status.attackSpeed.multiplier.clamp(0, 100).percent(Constants.MarleneW.max_projectile).add(Constants.MarleneW.projectiles.base[props.skillLevels.W]).floor().toNumber();

    return {
        basicAttack: ["debimarl"],
        skill: [
            [{label: "デビーQ", skill: "Q", damage: Constants.DebiQ.damage}],
            [{label: "デビーW", skill: "W", damage: Constants.DebiW.damage}],
            [
                {label: "デビーEマーリンエネルギー", skill: "E", damage: Constants.DebiE.damage},
                {label: "デビーE待機デビー突進", skill: "E", damage: Constants.DebiE.second_damage},
            ],
            [{label: "マーリンQ", skill: "Q", damage: Constants.MarleneQ.damage}],
            [
                {label: "マーリンW発射数", skill: "W", damage: marlW, type: "true"},
                {label: "マーリンWダメージ", skill: "W", damage: Constants.MarleneW.damage},
                {label: `マーリンWダメージ全ヒット(${wBullet})`, skill: "W", damage: Constants.MarleneW.damage, multiplier: wBullet * 100}
            ],
            [
                {label: "マーリンEデビー突進", skill: "E", damage: Constants.MarleneE.damage},
                {label: "マーリンE待機マーリンエネルギー", skill: "E", damage: Constants.MarleneE.second_damage},
            ],
            [
                {label: "R突進", skill: "R", damage: Constants.R.damage},
                {label: "R追加固定ダメージ", skill: "R", damage: Constants.R.second_damage, type: "true"},
                {label: `R追加固定ダメージ全ヒット(${Constants.R.second_damage_count})`, skill: "R", damage: Constants.R.second_damage, type: "true", multiplier: Constants.R.second_damage_count * 100}
            ],
            [
                {label: "T色変え", skill: "T", damage: Constants.T.damage},
                {label: `T色変え最大回数(${Constants.T.max_stack})`, skill: "T", damage: Constants.T.damage, multiplier: Constants.T.max_stack * 100}
            ]
        ]   
    }
}

export default table;