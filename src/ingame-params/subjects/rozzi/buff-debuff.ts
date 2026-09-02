import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // スピンショット(W) 使用中の自己移動速度増加
    "subject.rozzi.w-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.rozzi.w-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1021300",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed * stack
                }
            }]
        })
    },
    // セムテックス弾Mk-II(R) 強制起爆時の自己移動速度増加
    "subject.rozzi.r-detonate-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.rozzi.r-detonate-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1021530",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed.effect * stack
                }
            }]
        })
    },
    // 甘いチョコレート(T) チョコレート系アイテム使用時の自己攻撃力増加。ゲーム内での上限スタック数が
    // 公式ツールチップ・constants.tsに見当たらないため、飲んだか否かのみを表すbool（maxStack: 1）として
    // 扱う（li_dailinの百日酔と同様の事情、ユーザー確認済み）
    "subject.rozzi.t-attack": {
        origin: "skill",
        nameIntlID: "subject.rozzi.t-attack",
        maxStack: 1,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1021120",
                value: {
                    type: "constant",
                    value: Constants.T.attack.effect * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // スピンショット(W) 的中対象への防御力減少・治癒効果減少
    "subject.rozzi.w-debuff": {
        origin: "skill",
        nameIntlID: "subject.rozzi.w-debuff",
        maxStack: 5,
        stackLabels: CommonSkillLevelLabelsMax5,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1021310",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.W.defense_down[stack - 1] * -1
                }
            }],
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1021310",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.W.healing_reduction
                }
            }]
        })
    }
};

// セムテックス弾Mk-II(R)の付着時・爆発時の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録
// しない。現在は同一の効果量だが、パッチで別々に調整される可能性を考慮し、それぞれ別項目として登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.rozzi.r-attach-slow", values: [Constants.R.slow] },
    { nameIntlID: "subject.rozzi.r-detonate-slow", values: [Constants.R.detonate_slow.effect] }
];
