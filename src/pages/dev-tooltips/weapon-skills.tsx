import * as React from "react";
import { SubjectConfigDefault } from "core/subject-dynamic/config";
import { statusOf } from "core/subject-dynamic/status/calculation";
import { WeaponSkillTooltipDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import { Locales } from "@app/App";
import SkillTooltip from "components/tooltip/skill/tooltip";
import Pagination, { usePagedItems } from "./pagination";
import style from "./tooltip-grid.module.styl";

const config = SubjectConfigDefault;
const status = statusOf(config, 100);
const PageSize = 24;

const weaponSkills: React.FC = () => {
    // subjects.tsxと同じ理由（App.tsxとの循環参照）で、Localesの参照をレンダリング時まで遅延させる
    const entries = React.useMemo(() => Object.keys(WeaponSkillTooltipDictionary)
        .map(Number)
        .sort((a, b) => a - b)
        .map(code => ({ code, name: Locales["ja"][`Skill/Group/Name/${code}`] ?? String(code) })),
    []);

    const { pageItems, currentPage, totalPages, setPage } = usePagedItems(entries, PageSize);

    return (
        <div className={style.page}>
            <h1>武器スキルのツールチップ（{entries.length}件）</h1>
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
            <div className={style.grid}>
                {pageItems.map(({ code, name }) => (
                    <div key={code} className={style.card}>
                        <p className={style.label}>{name}（{code}）</p>
                        <SkillTooltip code={code} showEquation config={config} status={status} />
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
        </div>
    );
};

export default weaponSkills;
