import Constants from "./constants.json";
import { WeaponSkillSelfBuffDebuff } from "@app/ingame-params/weapon-skills/type";
import { weaponSkillLevel } from "core/subject-dynamic/status/weapon-skill-level";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// マント: 自己移動速度増加（Dスキルレベルにより30/35/40%）。スキルレベルの取得は`extractSkillLevel`ではなく
// `weaponSkillLevel`を直接使う（`weapon-skills/*/buff-debuff.ts`からの`extractSkillLevel`利用が循環参照で
// クラッシュする問題については`assault-rifle/buff-debuff.ts`のコメント・CHECKLIST.md参照）
export const buffDebuff: WeaponSkillSelfBuffDebuff = config => {
    const level = weaponSkillLevel(config.weaponMastery);

    return {
        "weapon-skill.onehandsword.cloak-movement-speed": {
            origin: "skill",
            nameIntlID: "CharacterState/Group/Name/3015000",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/3015000",
                    value: {
                        type: "constant",
                        value: Constants.cloak.movement_speed[level] * stack
                    }
                }]
            })
        }
    };
};

// 短剣: 対象への移動速度減少。移動速度減少（スロウ）自体は汎用デバフ（generic-slow.ts）1本にまとめるため、
// ここではgivenBuffDebuffに個別登録せず、「辞書」表示専用の参照データとしてのみ宣言する。l10n上は
// "短剣"という同名のCharacterStateが2件（3015100/3015200）存在するが区別ができないため、便宜上前者を使う
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "CharacterState/Group/Name/3015100", values: Constants.dagger.slow.effect }
];
