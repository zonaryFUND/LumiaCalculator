import { SkillLevels } from "app-types/subject-dynamic/config";
import { DamageTable, SkillValueProps } from "../damage-table";
import Constants from "./constants.json";

function array(raw: SkillValueProps, tLevel: number): SkillValueProps[] {
    const max = Constants.T.max_stack;
    return [...Array(max + 1)].map((_, i) => {
        if (i == 0) return raw;
        return {...raw, label: i == 0 ? raw.label : `${raw.label}(T${i}スタック)`, multiplier: [{basic: Constants.T.stack_damage_amp[tLevel] * i + 100}]}
    });
}

function table(props: {skillLevels: SkillLevels}): DamageTable {
    const tLevel = props.skillLevels.T;
    return {    
        basicAttack: ["disable-critical" as any]
            .concat(array({label: "T追加ダメージ", skill: "T", value: Constants.T.damage}, tLevel))
            .concat(array({label: "E引き戻し時追加ダメージ", skill: "E", value: Constants.E.second_damage}, tLevel)),
        skill: [
            array({label: "Q", skill: "Q", value: Constants.Q.damage}, tLevel),
            [
                ...array({label: "W1ティック", skill: "W", value: Constants.W.damage}, tLevel),
                ...array({label: "W最終ティック追加ダメージ", skill: "W", value: Constants.W.finish_damage}, tLevel),
            ],
            array({label: "Eヒット", skill: "E", value: Constants.E.first_damage}, tLevel)
        ]   
    }
}

export default table;