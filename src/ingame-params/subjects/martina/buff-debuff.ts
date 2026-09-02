import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// マルティナは「取材中」状態から「放送中」状態へゲーム内の行動によって永続的に変化する（能動的な切り替えでは
// ない）ため、状態切り替え用のプルダウン式自己バフは用意しない。各状態固有の効果は、その状態専用の自己バフ・
// 辞書項目として個別に登録する
export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 早送り(Q・取材中/放送中共通) 刻印消耗時の自己移動速度増加
    "subject.martina.q-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.martina.q-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1057200",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // 早送り(放送中Q) 刻印消耗時の自己攻撃速度増加
    "subject.martina.q2-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.martina.q2-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1057220",
                value: {
                    type: "constant",
                    value: Constants.Q2.attack_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // 早戻し(E・取材中/放送中共通) 状態中の自己移動速度増加
    "subject.martina.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.martina.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1057400",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed * stack
                }
            }]
        })
    },
    // 録画(取材中R) 撮影中の自己移動速度増加
    "subject.martina.r-recording-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.martina.r-recording-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1057500",
                value: {
                    type: "constant",
                    value: Constants.R.recording_movement_speed * stack
                }
            }]
        })
    },
    // 録画(取材中R) 撮影成功時の自己移動速度増加
    "subject.martina.r-recorded-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.martina.r-recorded-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1057570",
                value: {
                    type: "constant",
                    value: Constants.R.recorded_movement_speed.effect * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 録画(放送中R) 的中対象への防御力減少
    "subject.martina.r2-defense-down": {
        origin: "skill",
        nameIntlID: "subject.martina.r2-defense-down",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1057530",
                value: {
                    type: "constant",
                    value: Constants.R2.defense_reduction * -1 * stack
                }
            }]
        })
    }
};

// 一時停止(取材中W)・早戻し(取材中E、戻るときの的中時)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない。放送中Wの束縛・放送中Eの気絶は移動妨害効果の種別が異なり、
// このアプリのデバフ管理対象外のため登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.martina.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.martina.e-slow", values: [Constants.E.slow.effect] }
];
