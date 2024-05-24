import { WeaponID } from "app-types/equipment/weapon/id";
import { DamageTable, SkillDamageProps } from "../damage-table";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SkillLevels } from "app-types/subject-dynamic/config";

// The ratio of attack of echion's R depends on the level of T, but this application assumes that its always 3.
function table(props: {skillLevels: SkillLevels, weapon?: WeaponID, gauge: number}): DamageTable {
    const multiplier = new Decimal(Constants.R.damage_amp_per_vf[props.skillLevels.R]).times(props.gauge).add(100).toNumber();
    const sidewinder = props.weapon?.includes("sidewinder") ? Constants.R1.skill_damage_add[props.skillLevels.R] : undefined;

    const r: SkillDamageProps[] = (() => {
        if (props.weapon?.includes("sidewinder")) {
            return [
                {label: "Rエンベノミゼーション(基礎値)", skill: "R" as any, damage: Constants.R1.damage},
                {label: "Rエンベノミゼーション(増幅計算値)", skill: "R" as any, damage: Constants.R1.damage, sidewinder}
            ];
        }
        if (props.weapon?.includes("black_mamba")) {
            return [
                {label: "Rエンベノミゼーション", skill: "R" as any, damage: Constants.R2.damage},
                {label: "Rエンベノミゼーション2ヒット", skill: "R" as any, damage: Constants.R2.damage, multiplier: 200}
            ];
        } else if (props.weapon?.includes("deathadder")) {
            return [{label: "Rエンベノミゼーション", skill: "R" as any, damage: Constants.R3.damage}];
        };

        return [{label: "Rエンベノミゼーション", skill: "R" as any, damage: Constants.R0_1.damage}];
    })();

    return {
        basicAttack: props.weapon?.includes("deathadder") ? [
            "standard",
            {label: "暴走中追加ダメージ", skill: "T", damage: Constants.T3_2.damage, type: "basic"}
        ] : ["standard"],
        skill: [
            [
                {label: "Q1(基礎値)", skill: "Q", damage: Constants.Q.first_damage},
                {label: "Q1(増幅計算値)", skill: "Q", damage: Constants.Q.first_damage, multiplier, sidewinder},
                {label: "Q2(基礎値)", skill: "Q", damage: Constants.Q.second_damage},
                {label: "Q2(増幅計算値)", skill: "Q", damage: Constants.Q.second_damage, multiplier, sidewinder},
            ],
            [{label: "Wシールド", skill: "W", damage: Constants.W.shield, type: "shield"}],
            [
                {label: "E(基礎値)", skill: "E", damage: Constants.E.damage},
                {label: "E(増幅計算値)", skill: "E", damage: Constants.E.damage, multiplier, sidewinder}
            ],
            [{label: `R周囲固定ダメージ/${Constants.R.area_damage_tick}秒`, skill: "R" as any, damage: Constants.R.area_damage}]
                .concat(r as any)         
        ]   
    }
} 

export default table;