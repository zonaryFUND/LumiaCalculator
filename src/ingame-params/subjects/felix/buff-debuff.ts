import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { calculateValue } from "core/value-ratio";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => ({
    // 半月斬(E) 3段目強化ダメージ吸血。消耗した連携攻撃スタック数はバフのスタック数で代用する
    // （最大値はTの連携攻撃スタック最大値、Constants.T.max_stack）
    "subject.felix.e-omnisyphon": {
        origin: "skill",
        nameIntlID: "subject.felix.e-omnisyphon",
        maxStack: Constants.T.max_stack,
        buff: stack => {
            if (stack == 0) return {};

            const omnisyphon = calculateValue(
                { base: Constants.E.omnisyphon.effect.perStack * stack, attack: Constants.E.omnisyphon.effect.attack },
                status, config, "E"
            );

            return {
                lifeSteal: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1049180",
                    value: {
                        type: "constant",
                        value: omnisyphon.static.toNumber()
                    }
                }]
            };
        }
    }
});
