import Constants from "./constants.json";
import { WeaponSkillSelfBuffDebuff } from "@app/ingame-params/weapon-skills/type";

// VFゲージ50以上で発動する場合と、VF暴走状態中に発動する場合の2条件で移動速度増加が発生するが、
// いずれも効果量（25%、0.85秒）は同一のため、1つの自己バフとしてまとめて表現する。
// l10n上"VF安定化 - 移動速度増加"という同名のCharacterStateが2件（3021000/3021010、条件ごとに1件ずつと
// 見られる）存在するが区別ができないため前者を使う
export const buffDebuff: WeaponSkillSelfBuffDebuff = () => ({
    "weapon-skill.vfarm.movement-speed": {
        origin: "skill",
        nameIntlID: "CharacterState/Group/Name/3021000",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/3021000",
                value: {
                    type: "constant",
                    value: Constants.movement_speed.effect * stack
                }
            }]
        })
    }
})
