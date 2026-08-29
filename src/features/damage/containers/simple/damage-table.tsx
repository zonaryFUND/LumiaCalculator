import * as React from "react";
import BasicAttack from "./basic-attack";
import style from "../../components/potency-rows/damage-table.module.styl";
import SubjectSkill from "./subject-skill";
import GenericSubTable from "./generic-subtable";
import table from "components/common/table.module.styl";
import { useIntl } from "react-intl";
import useItemSkills from "../../use-item-skills";
import useWeaponSkill from "../../use-weapon-skills";
import useTacticalSkill from "../../use-tactical-skill";
import useAugment from "../../use-augment";
import { SubjectDamageTableDictionary } from "@app/ingame-params/subjects/dictionary";
import { useSubjectStateStore } from "@app/features/subject-config/store";

const damageTable: React.FC = () => {
    const intl = useIntl();
    const config = useSubjectStateStore(s => s.config);
    const status = useSubjectStateStore(s => s.status);

    const subject = React.useMemo(() =>
        SubjectDamageTableDictionary[config.subject]({
            config: config,
            status: status,
            intl
        })
    , [config.subject, status, config.skillLevels]);

    const weaponSkill = useWeaponSkill(config, status);
    const itemSkills = useItemSkills(config);
    const augments = useAugment(config);
    const tacticalSkills = useTacticalSkill(config);

    return (
        <section className={style.damage}>
            <h3>ダメージ</h3>
            <div className={table["table-base"]}>
                <table>
                    <BasicAttack
                        unitsChunks={
                            [
                                subject.basicAttack,
                                weaponSkill.basicAttackTriggered,
                                itemSkills.basicAttackTriggered
                            ].filter(array => array.length > 0)
                        }
                    />
                    <SubjectSkill
                        tables={subject.skill}
                    />
                    <GenericSubTable
                        label="武器スキル"
                        unitsChunks={[weaponSkill.regular]}
                    />
                    <GenericSubTable
                        label="アイテムスキル"
                        unitsChunks={[itemSkills.regular]}
                    />
                    <GenericSubTable
                        label="特性"
                        unitsChunks={augments}
                    />
                    <GenericSubTable
                        label="戦術スキル"
                        unitsChunks={tacticalSkills}
                    />
                </table>
            </div>
        </section>
    );
};

export default damageTable;
