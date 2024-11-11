import { SubjectID } from "app-types/subject-static/id";
import * as React from "react";
import Name from "dictionary/skill-name.json";
import baseStyle from "../tooltip.module.styl";
import style from "./subject-skill-tooltip.module.styl";
import Images from "@app/resources/image";
import Decimal from "decimal.js";
import Values, { ValuesProps } from "components/subjects/values";
import { SubjectSkillProps } from "components/subjects/props";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { Status } from "app-types/subject-dynamic/status/type";
import { ValueContext } from "../value-context";
import { CooldownOverride, SubjectSkills } from "components/subjects/skills";

type SkillsModule = {
    default: React.FC<{skillLevel: number}>
    cooldownOverride?: CooldownOverride
}
const skillsModules = import.meta.glob<SkillsModule>("components/subjects/**/*.tsx", {eager: true});

export const SkillsDescription = Object.entries(skillsModules).reduce((skills, [path, m]) => {
    const pathComponents = path.split("/");
    const [subject, skill] = pathComponents.slice(pathComponents.length - 2);
    return {
        ...skills,
        [subject]: {
            ...(subject in skills ? skills[subject] : {}),
            [skill.split(".")[0]]: m
        }
    }
}, {} as {
    [subject: string]: {
        [skill: string]: SkillsModule
    }
});

const constantModules = import.meta.glob("components/subjects/*/constants.json", {eager: true})
export const SkillsConstant = Object.entries(constantModules).reduce((consts, [path, m]) => {
    const pathComponents = path.split("/");
    const key = pathComponents[pathComponents.length - 2]
    return {
        ...consts,
        [key]: m
    }
}, {} as {
    [subject: string]: any
})

type Props = {
    id: SubjectID
    skill: string
    showEquation: boolean
    config: SubjectConfig
    status: Status
}

function valueOrElement(value: number | number[], index: number): number {
    if (Array.isArray(value)) return value[index];
    return value;
}

const ConsumptionAndCooldown: React.FC<Props & {skillLevel: number, status: Status}> = props => {
    const info = SkillsConstant[props.id][props.skill];
    const spCost = info.sp_cost == undefined ? null : valueOrElement(info.sp_cost, props.skillLevel);
    const hpCost = info.hp_cost == undefined ? null : valueOrElement(info.hp_cost, props.skillLevel);
    const cost = info.cost == undefined ? null : valueOrElement(info.cost, props.skillLevel);
    const hpPercentCost = info.hp_cost_percent == undefined ? null : valueOrElement(info.hp_cost_percent, props.skillLevel);

    const cooldown = (() => {
        if (info.cooldown == undefined) return null;

        const base = (() => {
            if (info.cooldown.constant != undefined) {
                return new Decimal(valueOrElement(info.cooldown.constant, props.skillLevel));
            } else {
                const baseValue = valueOrElement(info.cooldown, props.skillLevel);
                return new Decimal(baseValue).subPercent(props.status.cooldownReduction.calculatedValue);
            }
        })();

        const cooldownOverride = SkillsDescription[props.id][props.skill.toLowerCase()].cooldownOverride
        if (cooldownOverride) {
            return cooldownOverride(props.config, props.status)(base).toString();

            return base.toString();
        }
    })();

    const charge = (() => {
        if (info.charge == undefined) return null;
        const charge = (() => {
            if (info.charge.time.constant != undefined) {
                return valueOrElement(info.charge.time.constant, props.skillLevel);
            } else {
                const baseValue = valueOrElement(info.charge.time, props.skillLevel);
                return new Decimal(baseValue).subPercent(props.status.cooldownReduction.calculatedValue).toString();
            }
        })();
        return cooldown ? <>(チャージ時間{charge}秒)</> : <>チャージ時間{charge}秒</>;
    })();

    return (
        <div className={style.cooldown}>
            {spCost != null ? <>スタミナ {spCost}<br /></> : null}
            {hpCost != null ? <>体力 {hpCost}<br /></> : null}
            {hpPercentCost != null ? <>現在体力 {hpPercentCost}%<br /></> : null}
            {cost != null ? <>資源消費量 {cost}<br /></> : null}
            {spCost == null && hpCost == null && hpPercentCost == null && cost == null ? <>コストなし<br /></> : null}
            {
                cooldown != null ?
                <>クールダウン{cooldown}秒</> :
                null
            }
            {charge}
        </div>
    );
};

const subjectSkillTooltip: React.FC<Props> = props => {
    const subjectSkillsProps: SubjectSkillProps = {
        showEquation: props.showEquation,
        config: props.config,
        status: props.status
    }

    const src = React.useMemo(() => {
        const standard = Images.skill[props.id][props.skill];
        const def =  SubjectSkills[props.id]
        
        if (def?.SkillImage) {
            return def.SkillImage(props.skill) ?? standard;
        }
        return standard;
    }, [props.id, props.skill]);

    const skillIDForLevel = React.useMemo(() => {
        const def =  SubjectSkills[props.id]
        if (def == undefined || def.idForLevel == undefined) return props.skill as "Q" | "W" | "E" | "R" | "T";
        return def.idForLevel(props.skill) as "Q" | "W" | "E" | "R" | "T";
    }, [props.id, props.skill]);

    const skillIDForConsumption = React.useMemo(() => {
        const def =  SubjectSkills[props.id]
        if (def == undefined || def.idForConsumption == undefined) return props.skill;
        return def.idForConsumption(props.skill);
    }, [props.id, props.skill]);

    const valuesProps: ValuesProps = (() => {
        if (!props.showEquation) return null;
        const values = SkillsDescription[props.id][props.skill.toLowerCase()].values
        if (values == undefined) return null;
        return typeof values === "function" ? values(subjectSkillsProps) : values;
    })();

    return (
        <ValueContext.Provider value={props}>
            <div className={`${baseStyle.base} ${style.tooltip}`}>
                <div className={style.main}>
                    <header>
                        <img src={src} />
                        <div>
                            <div className={style.name}>
                                <h1>{(Name as any)[props.id][props.skill].jp} （レベル {props.config.skillLevels[skillIDForLevel] + 1}）</h1>
                                <p>[{skillIDForLevel}]</p>
                            </div>
                            <ConsumptionAndCooldown {...props} skill={skillIDForConsumption} skillLevel={props.config.skillLevels[skillIDForLevel]} />
                        </div>
                    </header>
                    <p>
                            {React.createElement(SkillsDescription[props.id][props.skill.toLowerCase()].default, {skillLevel: props.config.skillLevels[skillIDForLevel]})}
                    </p>
                </div>
                {
                    valuesProps ? (
                        <div className={style.values}>
                            <Values {...valuesProps} skillLevel={props.config.skillLevels[skillIDForLevel]} />
                        </div>
                    ) : null
                }
            </div>
        </ValueContext.Provider>
    );
};

export default subjectSkillTooltip;