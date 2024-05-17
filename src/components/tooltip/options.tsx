import { EquipmentStatus } from "app-types/equipment";
import Decimal from "decimal.js";
import * as React from "react";

function withTemplate(template: string, ...values: (Decimal | undefined)[]): React.ReactElement | null {
    if (values[0] == undefined) return null;

    const text = values.reduce((prev, value, index) => {
        return prev.replace(`<${index + 1}>`, value!.toString())
    }, template)
    return <li>{text}</li>
}

function withUniqueTemplate(template: string, ...values: (Decimal | undefined)[]): React.ReactElement | null {
    if (values[0] == undefined) return null;

    const text = values.reduce((prev, value, index) => {
        return prev.replace(`<${index + 1}>`, value!.toString())
    }, template)
    return <li><span>(固有)</span>{text}</li>
}

const options: React.FC<EquipmentStatus> = props => {
    const attackPower = withTemplate("攻撃力 +<1>", props.attackPower);
    const perLevelAttack = props.perLevelStatus?.type == "attack_power" ?
        withTemplate("レベル比例攻撃力 +<1>.0~<2>.0", props.perLevelStatus.value, props.perLevelStatus.value.times(20)) : null;
    const defense = withTemplate("防御力 +<1>", props.defense);
    const adaptiveStatus = withTemplate("攻撃力 +<1> または スキル増幅 +<2>", props.adaptiveStatus, props.adaptiveStatus?.times(2));
    const skillAmp = withTemplate("スキル増幅 +<1>", props.skillAmplification);
    const maxHP = withTemplate("最大体力 +<1>", props.maxHP);
    const maxSP = withTemplate("最大スタミナ +<1>", props.maxSP);
    const perLevelAmp = props.perLevelStatus?.type == "skill_amp" ?
        withTemplate("レベル比例スキル増幅 +<1>.0~<2>.0", props.perLevelStatus.value, props.perLevelStatus.value.times(20)) : null;
    const perLevelMHP = props.perLevelStatus?.type == "max_hp" ?
        withTemplate("レベル比例最大体力 +<1>.0~<2>.0", props.perLevelStatus.value, props.perLevelStatus.value.times(20)) : null;
    const hpRegen = withTemplate("体力再生 +<1>%", props.hpRegeneration);
    const spRegen = withTemplate("スタミナ再生 +<1>%", props.spRegeneration);
    const attackSpeed = withTemplate("攻撃速度 +<1>%", props.attackSpeed);
    const criticalChance = withTemplate("致命打確率 +<1>%", props.criticalChance);
    const criticlaDamage = withTemplate("致命打ダメージ量 +<1>%", props.criticalDamage);
    const movementSpeed = withTemplate("移動速度 +<1>", props.movementSpeed);
    const vision = withTemplate("視界範囲 +<1>", props.vision);
    const cooldownReduction = withTemplate("クールダウン減少 +<1>%", props.cooldownReduction);
    const omnisyphon = withTemplate("ダメージ吸血 +<1>%", props.omnisyphon);
    const lifeSteal = withTemplate("生命力吸収 +<1>%", props.lifeSteal);
    const skillDamageReduction = withTemplate("スキルダメージ減少 +<1>%", props.skillDamageReduction);
    const perLevelAAAmp = props.perLevelStatus?.type == "aa_amp" ? 
        withTemplate("レベル比例基本攻撃増幅 +<1>.0~<2>.0%", props.perLevelStatus.value, props.perLevelStatus.value.times(20)) : null;
    const armorPenetration = withTemplate("防御貫通 +<1>", props.armorPenetration);
    const armorPenetrationRatio = withTemplate("防御貫通 +<1>%", props.armorPenetrationRatio);
    const healPower = withTemplate("与える回復増加 +<1>%", props.healingPower);
    
    // unique
    const cdrCap = withUniqueTemplate("最大クールダウン減少 +<1>%", props.cdrCap);
    const tenacity = withUniqueTemplate("行動妨害耐性 +<1>%", props.tenacity);
    const aaRange = withUniqueTemplate("基本攻撃射程距離 +<1>", props.attackRange);

    return (
        <ul>
            {attackPower}
            {perLevelAttack}
            {defense}
            {adaptiveStatus}
            {skillAmp}
            {maxHP}
            {maxSP}
            {perLevelAmp}
            {perLevelMHP}
            {hpRegen}
            {spRegen}
            {attackSpeed}
            {criticalChance}
            {criticlaDamage}
            {movementSpeed}
            {vision}
            {cooldownReduction}
            {omnisyphon}
            {lifeSteal}
            {skillDamageReduction}
            {perLevelAAAmp}
            {armorPenetration}
            {armorPenetrationRatio}
            {healPower}
            {cdrCap}
            {tenacity}
            {aaRange}
        </ul>
    );
}

export default options;
