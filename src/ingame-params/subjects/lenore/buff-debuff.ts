import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // フィーネ(強化W) 自己移動速度増加
    "subject.lenore.w-enhanced-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.lenore.w-enhanced-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1075320",
                value: {
                    type: "constant",
                    value: Constants.W.enhance.movement_speed.effect * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 激痛の狂詩曲(R) 精神異常時の対象攻撃速度増加。数値上は増加効果だが、同士討ちを誘発する
    // 精神異常デバフの一部として付与されるため、実質的には「同士討ちによる脅威度増加」を意味する
    // デバフとして扱う（ユーザー指示）
    "subject.lenore.r-insane-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.lenore.r-insane-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1075510",
                value: {
                    type: "constant",
                    value: Constants.R.insane_attack_speed * stack
                }
            }]
        })
    }
};

// ダル・セーニョ(強化E)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。
// 激痛の狂詩曲(R)の移動速度減少は、時間経過でスタックが徐々に蓄積する単独の汎用スロウ効果として付与される
// 仕様のため、辞書には最大スタック時（12スタック）の効果量のみ掲載する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.lenore.e-enhanced-slow", values: [Constants.E.enhance_slow.effect] },
    { nameIntlID: "subject.lenore.r-slow-max", values: [Constants.R.slow * Constants.R.max_stack] }
];
