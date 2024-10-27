import { SubjectConfig } from "app-types/subject-dynamic/config";
import { weaponSkillLevel } from "app-types/subject-dynamic/status/weapon-skill-level";
import { SkillValueProps } from "components/subjects/damage-table";

export function extractskillLevel(props: SkillValueProps, config: SubjectConfig): number {
    if (props.skill == "other") return 0;
    if (props.skill == "D") return weaponSkillLevel(config.weaponMastery);
    if ((props.skill as any).tacticalLevel != undefined) return (props.skill as any).tacticalLevel;
    return (config.skillLevels as any)[props.skill as string];
}

type MultiplierExpression = {
    label?: string
    value: number
}

export function extractMultiplier(level: number, multiplier?: number | number[] | {name: string, value: number | number[]}[]): [number, MultiplierExpression[]] | undefined {
    if (multiplier == undefined) return undefined;
    if (typeof multiplier == "number") return [multiplier, []];
    if (typeof multiplier[level] == "number") return [multiplier[level] as number, []];
    return multiplier.reduce((prev, current) => {
        if (typeof current == "number") return [prev[0] * current / 100, prev[1].concat({value: current})];
        if (typeof current.value == "number") return [prev[0] * current.value / 100, prev[1].concat({label: current.name, value: current.value})];
        return [prev[0] * current.value[level] / 100, prev[1].concat({label: current.name, value: current.value[level]})];
    }, [100, [] as MultiplierExpression[]]);
}