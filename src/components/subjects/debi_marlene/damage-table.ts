import { SkillLevels } from "app-types/subject-dynamic/config";
import { DamageTable } from "../damage-table";
import Constants from "./constants.json";
import { Status } from "components/subject/status";

const marlW = {
    base: Constants.MarleneW.projectiles.base,
    additionalAttackSpeed: Constants.MarleneW.max_projectile,
    max: Constants.MarleneW.projectiles.base.map(v => v + Constants.MarleneW.max_projectile)
}

function table(props: {status: Status, skillLevels: SkillLevels}): DamageTable {
    const wBullet = props.status.attackSpeed.multiplier.clamp(0, 100).percent(Constants.MarleneW.max_projectile).add(Constants.MarleneW.projectiles.base[props.skillLevels.W]).floor().toNumber();

    return {
        //basicAttack: ["debimarl"],
        basicAttack: ["standard"],
        skill: [
            [{label: "デビーQ", skill: "Q", value: Constants.DebiQ.damage}],
            [{label: "デビーW", skill: "W", value: Constants.DebiW.damage}],
            [
                {label: "デビーEマーリンエネルギー", skill: "E", value: Constants.DebiE.damage},
                {label: "デビーE待機デビー突進", skill: "E", value: Constants.DebiE.second_damage},
            ],
            [{label: "マーリンQ", skill: "Q", value: Constants.MarleneQ.damage}],
            [
                {label: "マーリンW発射数", skill: "W", value: marlW, type: "true"},
                {label: "マーリンWダメージ", skill: "W", value: Constants.MarleneW.damage},
                {label: `マーリンWダメージ全ヒット(${wBullet})`, skill: "W", value: Constants.MarleneW.damage, multiplier: [{basic: wBullet * 100}]}
            ],
            [
                {label: "マーリンEデビー突進", skill: "E", value: Constants.MarleneE.damage},
                {label: "マーリンE待機マーリンエネルギー", skill: "E", value: Constants.MarleneE.second_damage},
            ],
            [
                {label: "R突進", skill: "R", value: Constants.R.damage},
                {label: "R追加固定ダメージ", skill: "R", value: Constants.R.second_damage, type: "true"},
                {label: `R追加固定ダメージ全ヒット(${Constants.R.second_damage_count})`, skill: "R", value: Constants.R.second_damage, type: "true", multiplier: [{basic: Constants.R.second_damage_count * 100}]}
            ],
            [
                {label: "T色変え", skill: "T", value: Constants.T.damage},
                {label: `T色変え最大回数(${Constants.T.max_stack})`, skill: "T", value: Constants.T.damage, multiplier: [{basic: Constants.T.max_stack * 100}]}
            ]
        ]   
    }
}

export default table;