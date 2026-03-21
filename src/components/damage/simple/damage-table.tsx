import * as React from "react";
import BasicAttack from "./subtables/basic-attack";
import style from "../damage-table.module.styl";
import SubjectSkill from "./subtables/subject-skill";
import SubTable from "./subtables/subtable";
import table from "components/common/table.module.styl";
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { useIntl } from "react-intl";
import useItemSkills from "../use-item-skills";
import useWeaponSkill from "../use-weapon-skills";
import useTacticalSkill from "../use-tactical-skill";
import useAugment from "../use-augment";
import { SubjectDamageTableDictionary } from "@app/ingame-params/subjects/dictionary";
import { useSubjectStateStore } from "@app/features/subject-config/store";

type Props = {
    status: Status
    hp: number
    config: SubjectConfig
}

const damageTable: React.FC = props => {
    const intl = useIntl();
    const config = useSubjectStateStore(s => s.config);
    const status = useSubjectStateStore(s => s.status);
    const hpRatio = useSubjectStateStore(s => s.hpRatio);

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
                        elements={
                            [
                                subject.basicAttack,
                                weaponSkill.basicAttackTriggered,
                                itemSkills.basicAttackTriggered
                            ].filter(array => array.length > 0)
                        }
                        status={status} 
                        config={config}
                        hp={hpRatio}
                    />
                    <SubjectSkill 
                        tables={subject.skill}
                        config={config}
                        status={status}
                        hp={hpRatio}
                    />
                    <SubTable
                        label="武器スキル"
                        elements={[weaponSkill.regular]}
                        config={config}
                        status={status}
                        hp={hpRatio}
                    />
                    <SubTable 
                        label="アイテムスキル"
                        elements={[itemSkills.regular]}
                        config={config}
                        status={status}
                        hp={hpRatio}
                    />
                    <SubTable 
                        label="特性"
                        elements={augments}
                        config={config}
                        status={status}
                        hp={hpRatio} 
                    />
                    <SubTable 
                        label="戦術スキル"
                        elements={tacticalSkills}
                        config={config}
                        status={status}
                        hp={hpRatio}
                    />
                </table>
            </div>
        </section>
    );
};

export default damageTable;