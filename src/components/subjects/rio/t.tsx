import * as React from "react";
import Constants from "./constants.json";
import { ValuesProps } from "../values";
import style from "components/tooltip/tooltip.module.styl";
import { useValueContext } from "components/tooltip/value-context";
import { SubjectSkillProps } from "components/tooltip/subject-skill/props";
import { additionalPenetration } from "./status-override";
import { UniqueValueStrategy } from "../unique-value-strategy";
import Decimal from "decimal.js";
import { Status } from "app-types/subject-dynamic/status/type";
import { BaseCriticalDamagePercent } from "app-types/subject-dynamic/status/standard-values";

function rioBasicAttackMultiplier(status: Status): Decimal {
    const base = Constants.T.basic_attack_damage.base;
    const multiplied = new Decimal(Constants.T.basic_attack_damage.criticalBase).add(status.criticalDamage.calculatedValue)

    return new Decimal(base)
        .add(status.criticalChance.calculatedValue.mul(multiplied))
}

export function RioTStrategy(bow: "daikyu" | "hankyu" | "hankyu-2"): UniqueValueStrategy {
    return (config, status) => {
        const bowRatio = (() => {
            switch (bow) {
                case "daikyu":      return Constants.Q.daikyu.attack;
                case "hankyu":      return Constants.Q.hankyu.attack;
                case "hankyu-2":    return Constants.Q.hankyu.attack * 2;
            }
        })();
        const tRatio = rioBasicAttackMultiplier(status);
        const value = status.attackPower.calculatedValue
            .percent(bowRatio)
            .addPercent(status.basicAttackAmp.calculatedValue)
            .percent(tRatio)

        return {
            value,
            equationExpression: bow == "hankyu-2" ? [] : [
                {
                    labelIntlID: "app.standard-value",
                    expression: [
                        {ratioKey: "attack"},
                        `${status.attackPower.calculatedValue.toString()} x ${bowRatio}% x (`,
                        {ratioKey: "basicAttackAmp"},
                        `${status.basicAttackAmp.calculatedValue.toString()} + 1) = ${value.toString()}`
                    ]
                },
                {
                    labelIntlID: "subject.rio.passive-penetration",
                    expression: [
                        `${Constants.T.basic_attack_damage.base}% + (`,
                        {ratioKey: "criticalChance"},
                        `${status.criticalChance.calculatedValue.toString()}% x (${BaseCriticalDamagePercent}% + `,
                        {ratioKey: "criticalDamage"},
                        `${status.criticalDamage.calculatedValue.toString()}%)) = ${tRatio}%`
                    ]
                }
            ]
        }
    }
} 

const t: React.FC<SubjectSkillProps> = props => {
    const { status, showEquation } = useValueContext();
    const defense = (() => {
        if (showEquation) {
            return <><span className={style.emphasis}>{Constants.T.defense_decline.base[props.skillLevel]}%</span><span className={style.critical}>(+致命打確率の1%あたり{Constants.T.defense_decline.criticalChance}%)</span></>;
        } else {
            return <span className={style.emphasis}>{additionalPenetration(props.skillLevel, status).toString()}%</span>
        }
    })();

    const basicAttack = (() => {
        if (showEquation) {
            return <><span className={style.emphasis}>{Constants.T.basic_attack_damage.base}%</span><span className={style.critical}>(+致命打確率 * ({Constants.T.basic_attack_damage.criticalBase}% + 致命打ダメージ増加量))</span></>;
        } else {
            return <span className={style.emphasis}>{rioBasicAttackMultiplier(status).toString()}%</span>
        }
    })()

    return (
        <>
            莉央の基本攻撃とスキルは的中した対象の防御力を致命打確率に応じて{defense}だけ減少した状態のダメージを与えます。<br />
            莉央の基本攻撃は致命打が発生しない代わりに{basicAttack}のダメージを与えます。<br />
            基本攻撃ダメージ量は致命打確率に比例して増加します。
        </>
    );
}

export default t;

export const values: ValuesProps = {
    parameters: [
        {title: "防御力減少量(%)", values: Constants.T.defense_decline.base, percent: true}
    ]
}
