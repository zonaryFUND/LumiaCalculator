import Constants from "./constants.json";
import { EquipmentAbilityGivenBuffDebuff } from "../type";
import { CommonLevelLabels } from "@app/ingame-params/buff-debuff/util";

// 味方（自分以外）に与えるバフ。適合型能力値の増加分は発生源（装備者）のレベルに応じて変化するため、
// stack（1..20=発生源のレベルそのもの、0=付与なし）で表現する
// （tactical-skill/buff-debuff.tsの「プロトコル違反」と同じパターン）。
// buff(stack)はstack=0で必ず0になる規約だが、adaptiveForceの実式`base + level係数*レベル`はレベル0で
// 自然にゼロにならないため、stack == 0のときは何も返さない分岐を明示している
export const givenBuffDebuff: EquipmentAbilityGivenBuffDebuff = () => ({
    "item-skill.encourage": {
        origin: "equipment-ability",
        nameIntlID: "item-skill.encourage",
        maxStack: 20,
        stackLabels: CommonLevelLabels(20),
        buff: stack => (
            stack == 0 ? {} : {
                adaptiveForce: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/6032000",
                    value: {
                        type: "constant",
                        value: Constants.adaptive.base + Constants.adaptive.level * stack
                    }
                }],
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/6032000",
                    value: {
                        type: "constant",
                        value: Constants.as
                    }
                }]
            }
        )
    }
})
