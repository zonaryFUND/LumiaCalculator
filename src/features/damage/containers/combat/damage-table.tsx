import * as React from "react";
import style from "../../components/potency-rows/damage-table.module.styl";
import table from "components/common/table.module.styl";
import { Status } from "core/subject-dynamic/status/type";
import { SubjectConfig } from "core/subject-dynamic/config";
import { useIntl } from "react-intl";
import { MitigationContext, createMitigation } from "./mitigation-context";
import SegmentedControl from "components/common/segmented-control";
import { CombatHPContext } from "./combat-hp-context";
import BasicAttack from "./subtables/basic-attack";
import SubTable from "./subtables/subtable";
import useItemSkills from "@app/features/damage/use-item-skills";
import useWeaponSkill from "@app/features/damage/use-weapon-skills";
import useTacticalSkill from "@app/features/damage/use-tactical-skill";
import useAugment from "@app/features/damage/use-augment";
import { SubjectDamageTableDictionary } from "@app/ingame-params/subjects/dictionary";

export type SubjectSnapshot = {
    status: Status
    config: SubjectConfig
    hp: number
}

type Props = {
    left: SubjectSnapshot
    right: SubjectSnapshot
}

/**
 * 対戦モードの中央カラム（ダメージ計算結果）のエントリポイント。
 *
 * 左右2つの実験体のスナップショット（{@link SubjectSnapshot}）を受け取るだけの読み取り専用コンポーネントで、
 * Zustand storeには一切依存しない。「左→右」「右←左」のトグル状態はこのコンポーネント自身が保持し、
 * それに応じて`from`（発生源）・`to`（仮想敵）を選び出して配下へ渡す。
 */
const damageTable: React.FC<Props> = props => {
    const intl = useIntl();
    const ltr = React.useState<"ltr" | "rtl">("ltr");
    const [from, to] = ltr[0] == "ltr" ? [props.left, props.right] : [props.right, props.left];

    const subject = SubjectDamageTableDictionary[from.config.subject]({
        status: from.status,
        config: from.config,
        intl
    });

    const weaponSkill = useWeaponSkill(from.config, from.status);
    const itemSkills = useItemSkills(from.config);
    const augments = useAugment(from.config);
    const tacticalSkills = useTacticalSkill(from.config);

    return (
        <CombatHPContext.Provider value={{hp: from.hp, targetHP: to.hp, targetMaxHP: to.status.maxHp.calculatedValue, ltr: ltr[0]}} >
        <MitigationContext.Provider value={createMitigation(from.status, to.status)} >
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
                        from={from}
                    />
                    <SubTable
                        label="実験体スキル"
                        elements={subject.skill}
                        from={from}
                    />
                    <SubTable
                        label="武器スキル"
                        elements={[weaponSkill.regular]}
                        from={from}
                    />
                    <SubTable
                        label="アイテムスキル"
                        elements={[itemSkills.regular]}
                        from={from}
                    />
                    <SubTable
                        label="特性"
                        elements={augments}
                        from={from}
                    />
                    <SubTable
                        label="戦術スキル"
                        elements={tacticalSkills}
                        from={from}
                    />
                </table>
            </div>
        </section>
        </MitigationContext.Provider>
        </CombatHPContext.Provider>
    );
};

export default damageTable;
