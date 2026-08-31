import Constants from "./constants";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { CommonLevelLabels } from "@app/ingame-params/buff-debuff/util";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";

/**
 * 戦術スキル由来の選択式自己バフ（`origin: "tactical-skill"`）。ユーザーが`self-buffs.tsx`の追加UIから
 * 任意に選択する（`selectable-self-buff-catalog.ts`参照）。
 *
 * 現時点ではまだデータを持たない。移動速度減少などのスロウ効果は個別の戦術スキルごとに列挙せず、
 * 汎用的な「任意のスロウ」カタログ項目として別途実装する方針（`core/README.md`参照）のため対象外
 */
export const TacticalSkillBuffDebuff = (_config: SubjectConfig, _status: Status): Record<string, BuffDebuffDefinition> => ({});

/**
 * 戦術スキルが他者（味方・敵。`SubjectConfig.incomingBuffs`のdocコメント参照）に与えるバフ・デバフの定義
 * （`origin: "tactical-skill"`）。`SubjectModules.givenBuffDebuff`・`WeaponSkillModule.givenBuffDebuff`と
 * 同様、受信側の計算機は発生源のconfigを保持していないため定数カタログとして定義する。戦術スキルは
 * サブディレクトリを持たない単一モジュールで、`weapon-skills/dictionary.ts`のようなglob集約は不要なため
 * `ingame-params/buff-debuff/incoming-catalog.ts`から直接importする
 *
 * サンプル: 「プロトコル違反」の命中時体力増加（ダメージは今回の実装対象外）。戦術スキルレベル（1/2）分は
 * 同種の定義を2つ用意することで表現し、発生源（実験体）のレベル依存分は`stack`（1..20 = レベルそのもの、
 * 0 = 付与なし）で表現する。`buff(stack)`はstack=0で必ず0になる規約（`ingame-params/README.md`参照）だが、
 * この効果の実式`base + level係数*レベル`はレベル0で自然にゼロにならないため、`stack == 0`のときだけ`0`を
 * 返す分岐を明示している
 */
export const TacticalSkillGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // プロトコル違反（戦術スキルLv1）
    // スタックラベルは発生源のレベルとする
    "tactical-skill.protocol-violation.lv1": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.protocol-violation.lv1",
        maxStack: 20,
        stackLabels: CommonLevelLabels(20),
        buff: stack => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4101010",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.protocol_violation.hp_increase.base[0] + Constants.protocol_violation.hp_increase.level[0] * stack
                }
            }]
        })
    },
    // プロトコル違反（戦術スキルLv2）
    // スタックラベルは発生源のレベルとする
    "tactical-skill.protocol-violation.lv2": {
        origin: "tactical-skill",
        nameIntlID: "tactical-skill.protocol-violation.lv2",
        maxStack: 20,
        stackLabels: CommonLevelLabels(20),
        buff: stack => ({
            maxHp: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/4101010",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.protocol_violation.hp_increase.base[1] + Constants.protocol_violation.hp_increase.level[1] * stack
                }
            }]
        })
    }
};
