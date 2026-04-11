import * as React from "react";
import SkillsVariation from "./skills-variation";
import { weaponTypeIDOf } from "app-types/subject-dynamic/config";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { SubjectSkillListExpressionDictionary } from "@app/ingame-params/subjects/dictionary";
import Skill from "./skill";
import { WeaponSkillCodeDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import style from "./vertical-line.module.styl";

// 実験体スキルセクションのうち、上側の「スキルアイコンが並んでいる行」を構成する
// 実験体固有スキル（Q,W,E,R,T）と武器スキル（D）のアイコンを横並びにする
// 武器を装備していない場合にはアイコンを表示せず、固有武器スキルを持つ場合（例：ブレア）はそのスキルを表示する
const IconsLine: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const weaponType = useSubjectStateStore(s => weaponTypeIDOf(s.config));
    const list = SubjectSkillListExpressionDictionary[config.subject](config)

    const weaponSkill = React.useMemo(() => {
        if (list.D) {
            return <SkillsVariation codes={list.D} />
        } else {
            return <Skill code={weaponType ? WeaponSkillCodeDictionary[weaponType] : undefined} />
        }
    }, [config])

    // 1行6列のグリッドレイアウトが親要素に設定されていることを前提としている
    return (
        <>
            <div key="Q" className={style.vertical}>
                <SkillsVariation codes={list.Q} />
            </div>
            <div key="W" className={style.vertical}>
                <SkillsVariation codes={list.W} />
            </div>
            <div key="E" className={style.vertical}>
                <SkillsVariation codes={list.E} />
            </div>
            <div key="R" className={style.vertical}>
                <SkillsVariation codes={list.R} />
            </div>
            <div key="T" className={style.vertical}>
                <SkillsVariation codes={list.T} />
            </div>
            <div className={style.vertical}>
                {weaponSkill}
            </div>
        </>
    )
}

export default IconsLine;