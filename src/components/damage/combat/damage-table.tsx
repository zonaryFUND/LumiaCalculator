import * as React from "react";
import style from "../damage-table.module.styl";
import { SubjectDamageTable } from "components/subjects/damage-table";
import table from "components/common/table.module.styl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { useIntl } from "react-intl";
import { MitigationContext, createMitigation } from "./mitigation-context";
import SegmentedControl from "components/common/segmented-control";
import { CombatHPContext } from "./combat-hp-context";
import BasicAttack from "./subtables/basic-attack";
import SubTable from "./subtables/subtable";
import useItemSkills from "../use-item-skills";
import useWeaponSkill from "../use-weapon-skills";
import useTacticalSkill from "../use-tactical-skill";
import useAugment from "../use-augment";

type Props = {
    hideHeader?: boolean
    left: {
        status: Status
        config: SubjectConfig
        hp: number
    }
    right: {
        status: Status
        config: SubjectConfig
        hp: number
    }
}

const damageTable: React.FC<Props> = props => {
    const intl = useIntl();
    const ltr = React.useState<"ltr" | "rtl" | undefined>("ltr");
    const [attacker, defender] = ltr[0] == "ltr" ? [props.left, props.right] : [props.right, props.left]

    const subject = SubjectDamageTable[attacker.config.subject]({
        status: attacker.status,
        config: attacker.config,
        intl
    });

    const weaponSkill = useWeaponSkill(attacker.config);
    const itemSkills = useItemSkills(attacker.config);
    const augments = useAugment(attacker.config);
    const tacticalSkills = useTacticalSkill(attacker.config);

    return (
        <CombatHPContext.Provider value={{hp: attacker.hp, targetHP: defender.hp, targetMaxHP: defender.status.maxHP.calculatedValue, ltr: ltr[0]!}} >
        <MitigationContext.Provider value={createMitigation(attacker.status, defender.status)} >
        <section className={style.damage}>
            <header className={style.switch}>
                <SegmentedControl 
                    name="direction" 
                    segments={[{title: "左→右", value: "ltr"}, {title:  "左←右", value: "rtl"}]} 
                    value={ltr as any}
                    style={{verticalPadding: 2}}
                />
            </header>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack 
                        elements={[
                            subject.basicAttack,
                            weaponSkill.basicAttackTriggered,
                            itemSkills.basicAttackTriggered
                        ]}
                        attacker={{
                            config: attacker.config,
                            status: attacker.status
                        }}
                    />
                    <SubTable 
                        label="実験体スキル"
                        elements={subject.skill}
                        attacker={{
                            config: attacker.config,
                            status: attacker.status
                        }}
                    />
                    <SubTable 
                        label="武器スキル"
                        elements={[weaponSkill.regular]}
                        attacker={{
                            config: attacker.config,
                            status: attacker.status
                        }}
                    />
                    <SubTable 
                        label="アイテムスキル"
                        elements={[itemSkills.regular]}
                        attacker={{
                            config: attacker.config,
                            status: attacker.status
                        }}
                    />
                    <SubTable 
                        label="特性"
                        elements={augments}
                        attacker={{
                            config: attacker.config,
                            status: attacker.status
                        }}
                    />
                    <SubTable 
                        label="戦術スキル"
                        elements={tacticalSkills}
                        attacker={{
                            config: attacker.config,
                            status: attacker.status
                        }}
                    />
                </table>
            </div>
        </section>
        </MitigationContext.Provider>
        </CombatHPContext.Provider>
    );
};

export default damageTable;