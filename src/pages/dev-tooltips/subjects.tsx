import * as React from "react";
import { SubjectConfigDefault } from "core/subject-dynamic/config";
import { statusOf } from "core/subject-dynamic/status/calculation";
import { SubjectTooltipDictionary } from "@app/ingame-params/subjects/dictionary";
import { Locales } from "@app/App";
import SkillTooltip from "components/tooltip/skill/tooltip";
import Pagination, { usePagedItems } from "./pagination";
import style from "./tooltip-grid.module.styl";

const config = SubjectConfigDefault;
const status = statusOf(config, 100);
const PageSize = 24;

const subjects: React.FC = () => {
    // App.tsxがこのページを（他の2ページとともに）importしており、Localesを再びApp.tsxからimportして
    // モジュールトップレベルで参照すると循環参照になりLocalesがまだ未初期化のまま（undefined）参照されて
    // クラッシュする。レンダリング時（Reactの初期化がすべて終わったあと）まで参照を遅延させるため
    // useMemoの中で計算する
    // コード順に並べると実験体ごとにひとかたまりになる（実験体ごとにコードの上位桁が固定のため）
    const entries = React.useMemo(() => Object.keys(SubjectTooltipDictionary)
        .map(Number)
        .sort((a, b) => a - b)
        .map(code => ({ code, name: Locales["ja"][`Skill/Group/Name/${code}`] ?? String(code) })),
    []);

    const { pageItems, currentPage, totalPages, setPage } = usePagedItems(entries, PageSize);

    return (
        <div className={style.page}>
            <h1>実験体スキルのツールチップ（{entries.length}件）</h1>
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

export default subjects;
