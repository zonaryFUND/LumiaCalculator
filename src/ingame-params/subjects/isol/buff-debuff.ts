import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 遊撃戦(T) トラップ的中時の自己攻撃力/スキル増幅増加。実際の効果量（スキル増幅側は攻撃力側の
    // ちょうど2倍）が適合型能力値の変換規則（core/subject-dynamic/status/calculation.tsの
    // resolveAdaptiveForceBuff、適合型能力値はスキル増幅換算時のみ2倍になる）と一致するため、
    // 攻撃力/スキル増幅を個別に持たず適合型能力値の増加として表現する
    "subject.isol.t-adaptive-force": {
        origin: "skill",
        nameIntlID: "subject.isol.t-adaptive-force",
        maxStack: 1,
        buff: stack => ({
            adaptiveForce: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1009100",
                value: {
                    type: "constant",
                    value: Constants.T.attack[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// 火網(W) 的中対象への防御力flat減少は、他者バフカタログ（givenBuffDebuff）が発生源のconfig
// （＝Wのスキルレベル）を持てないため、スタック数（0〜6）とスキルレベルという2軸に本来依存する効果量を
// そのままでは表現できない。ただし現バージョンではWレベル1〜5に対する1スタックあたりの効果量
// （Constants.W.defense_decline = [2, 2, 3, 3, 4]）がLv1・2で2、Lv3・4で3、Lv5で4の3パターンにしか
// ならないため、「Lv1,2のW」「Lv3,4のW」「Lv5のW」を辞書上の別項目として登録し、スタック数のみ可変にする
// 構造で回避する。
// 将来のバランス調整でこの3パターンへの集約が成立しなくなった場合（例: Lv3とLv4で異なる値になる）は、
// この分割自体の見直しが必要
export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    "subject.isol.w-defense-down-lv12": {
        origin: "skill",
        nameIntlID: "subject.isol.w-defense-down-lv12",
        maxStack: Constants.W.defense_decline_max,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1009110",
                value: {
                    type: "constant",
                    value: Constants.W.defense_decline[0] * -1 * stack
                }
            }]
        })
    },
    "subject.isol.w-defense-down-lv34": {
        origin: "skill",
        nameIntlID: "subject.isol.w-defense-down-lv34",
        maxStack: Constants.W.defense_decline_max,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1009110",
                value: {
                    type: "constant",
                    value: Constants.W.defense_decline[2] * -1 * stack
                }
            }]
        })
    },
    "subject.isol.w-defense-down-lv5": {
        origin: "skill",
        nameIntlID: "subject.isol.w-defense-down-lv5",
        maxStack: Constants.W.defense_decline_max,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1009110",
                value: {
                    type: "constant",
                    value: Constants.W.defense_decline[4] * -1 * stack
                }
            }]
        })
    }
};
