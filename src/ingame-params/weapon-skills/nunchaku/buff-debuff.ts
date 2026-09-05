import Constants from "./constants.json";
import { WeaponSkillSelfBuffDebuff } from "@app/ingame-params/weapon-skills/type";

// チャージ中の自己移動速度減少。l10nに専用のCharacterState表記が見当たらないため、weapon-skills.jsonに
// 独自定義した名前を使う（自己が受けるスロウのため、他者向けスロウの汎用デバフ・slowSourcesの対象外）
export const buffDebuff: WeaponSkillSelfBuffDebuff = () => ({
    "weapon-skill.nunchaku.charge-self-slow": {
        origin: "skill",
        nameIntlID: "weapon-skill.nunchaku.charge-self-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "weapon-skill.nunchaku.charge-self-slow",
                value: {
                    type: "constant",
                    value: -Constants.movement_speed_penalty * stack
                }
            }]
        })
    }
})
