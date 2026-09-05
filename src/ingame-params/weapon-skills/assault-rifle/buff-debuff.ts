import Constants from "./constants.json";
import { WeaponSkillSelfBuffDebuff } from "@app/ingame-params/weapon-skills/type";
import { weaponSkillLevel } from "core/subject-dynamic/status/weapon-skill-level";
import { CommonStackLabels } from "@app/ingame-params/buff-debuff/util";

// 過熱スタック（最大値はDスキルレベルに応じて50/75/100）は基本攻撃の命中で蓄積される資源であり、
// 1スタック単位で管理する要求ではないため5刻みで選択させる。過熱状態（Dスキル使用で発動）中は攻撃速度
// （Dスキルレベル依存の固定値）が増加し、あわせて「基本攻撃追加ダメージ」（過熱スタックに比例、固定値。
// 装備の旧ステータスincreaseBasicAttackDamageと同名のStatusフィールドとして新設。ダメージ計算への反映は
// 未実装）が付与される。CharacterState/Group/Name/3010100（過熱）を使用（3010000は同じ数値レンジ内の
// 別テキスト「攻撃速度制限無視」であり紛らわしいので注意。ゲーム内表記の確認は名称の完全一致で行った）
//
// スキルレベルの取得には通常`core/value-ratio/extraction.ts`の`extractSkillLevel(config, "D")`
// （実験体固有の熟練度→レベル対応の上書き`SubjectWeaponSkillOverrideDictionary`を考慮する）を使うべきだが、
// ここから`weapon-skills/dictionary.ts`（`buffDebuff`を含む全武器スキルをeager globする）→本ファイル→
// `core/value-ratio/extraction.ts`→`subjects/dictionary.ts`（全実験体をeager glob）→
// `core/subject-dynamic/status/calculation.ts`→`self-buff-definitions.ts`→`weapon-skills/dictionary.ts`と
// 循環参照が閉じてしまい、テストで実際に「extractSkillLevel is not a function」のクラッシュを確認した。
// 現在登録されている上書き（`blair`の`weaponSkillLevelOverride`）は素の`weaponSkillLevel`と同一関数のため、
// 実質的に上書きなしと等価。そのため素の`weaponSkillLevel(config.weaponMastery)`を直接使うことで循環参照を
// 回避した（挙動は現状の全実験体に対して`extractSkillLevel`と一致する）。将来、武器スキルレベルの上書きを
// 持つ実験体が追加された場合は、この回避策が正しく機能しなくなるため要再検討
export const buffDebuff: WeaponSkillSelfBuffDebuff = config => {
    const level = weaponSkillLevel(config.weaponMastery);
    const maxStack = Constants.max_stack[level];

    return {
        "weapon-skill.assault-rifle.overheat": {
            origin: "skill",
            nameIntlID: "CharacterState/Group/Name/3010100",
            maxStack: maxStack / 5,
            stackLabels: CommonStackLabels(maxStack, 5),
            buff: index => {
                const stack = index * 5;
                if (stack == 0) return {};

                return {
                    attackSpeed: [{
                        origin: "temporary-status",
                        calculationType: "mul",
                        intlID: "CharacterState/Group/Name/3010100",
                        value: {
                            type: "constant",
                            value: Constants.attack_speed[level]
                        }
                    }],
                    increaseBasicAttackDamage: [{
                        origin: "temporary-status",
                        calculationType: "sum",
                        intlID: "CharacterState/Group/Name/3010100",
                        value: {
                            type: "constant",
                            value: Constants.per_stack.basic_attack_addition * stack
                        }
                    }]
                };
            }
        }
    };
};
