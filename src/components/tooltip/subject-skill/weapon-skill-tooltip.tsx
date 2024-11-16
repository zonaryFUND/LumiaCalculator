import * as React from "react";
import Name from "dictionary/weapon-skill-name.json";
import baseStyle from "../tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import Values, { ValuesProps } from "components/subjects/values";
import Constant from "components/subjects/weapon-skills/constants.json";
import { ValueContext, useValueContext } from "../value-context";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { FormattedMessage } from "react-intl";

function valueOrElement(value: number | number[], index: number): number {
    if (Array.isArray(value)) return value[index];
    return value;
}

const skillsModules = import.meta.glob<{
    default: React.FC<{skillLevel: number}>
}>("components/subjects/weapon-skills/*.tsx", {eager: true});
export const SkillsDescription = Object.entries(skillsModules).reduce((skills: any, [path, m]) => {
    const pathComponents = path.split("/");
    const weapon = pathComponents[pathComponents.length - 1];
    return {
        ...skills,
        [weapon.split(".")[0]]: m
    };
}, {}) as any

const WeaponSkillCodeDictionary = {
    OneHandSword: 3015000,
    TwoHandSword: 3016000,
    Axe: 3014000,
    DualSword: 3018000,
    Pistol: 3009000,
    AssaultRifle: 3010000,
    SniperRifle: 3011000,
    Glove: 3001000,
    Tonfa: 3002000,
    Bat: 3003000,
    Hammer: 3013000,
    Bow: 3007000,
    CrossBow: 3008000,
    Spear: 3019000,
    Rapier: 3021000,
    HighAngleFire: 3005000,
    DirectFire: 3006000,
    Guitar: 3022000,
    Nunchaku: 3020000,
    Whip: 3004000,
    Camera: 3023000,
    VFArm: 3024000
}

type Props = {
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

const weaponSkillTooltip: React.FC<Props> = props => {
    const weaponType = React.useMemo(() => {
        return EquipmentStatusDictionary[props.config.equipment.weapon!].type;
    }, [props.config.equipment.weapon]);

    const level = weaponSkillLevel(props.config.weaponMastery);

    const valuesProps: ValuesProps = (() => {
        if (!props.showEquation) return null;
        const values = SkillsDescription[weaponType.toLowerCase()].values
        return typeof values === "function" ? values(props) : values;
    })();

    const basicAdditionalText = <>
        武器熟練度<span className={baseStyle.emphasis}>5Lv・10Lv・15Lv</span>の時にスキルレベルアップ<br />
        クールダウン固定：このスキルはクールダウン減少の影響を受けません。
    </>

    return (
        <ValueContext.Provider value={props}>
        <div className={`${baseStyle.base} ${style.tooltip}`}>
            <div className={style.main}>
                <header>
                    <img src={Images.skill.weapon[weaponType]} />
                    <div>
                        <div className={style.name}>
                            <h1><FormattedMessage id={`Skill/Group/Name/${(WeaponSkillCodeDictionary as any)[weaponType]}`} /> （レベル {level + 1}）</h1>
                            <p>[D]</p>
                        </div>
                        <div className={style.cooldown}>
                            コストなし<br />
                            クールダウン{valueOrElement((Constant as any)[weaponType.toLowerCase()].cooldown, level)}秒
                        </div>
                    </div>
                </header>
                <p>
                    {React.createElement(SkillsDescription[weaponType.toLowerCase()].default, {skillLevel: level})}
                </p>
            </div>
            {
                valuesProps ? (
                    <div className={style.values}>
                        <Values {...valuesProps} additionalInfo={<>{valuesProps.additionalInfo ? <>{valuesProps.additionalInfo}<br /></> : null}{basicAdditionalText}</>} skillLevel={level} />
                    </div>
                ) : null
            }
        </div>
        </ValueContext.Provider>
    );
};

export default weaponSkillTooltip;