import * as React from "react";
import { SubjectConfigDefault } from "core/subject-dynamic/config";
import { statusOf } from "core/subject-dynamic/status/calculation";
import { EquipmentStatusDictionary } from "core/equipment";
import { Locales } from "@app/App";
import ItemTooltip from "components/tooltip/item/item-tooltip";
import Pagination, { usePagedItems } from "./pagination";
import style from "./tooltip-grid.module.styl";

const config = SubjectConfigDefault;
const status = statusOf(config, 100);
const PageSize = 24;

const items: React.FC = () => {
    // subjects.tsxと同じ理由（App.tsxとの循環参照）で、Localesの参照をレンダリング時まで遅延させる
    const entries = React.useMemo(() => Object.keys(EquipmentStatusDictionary)
        .map(Number)
        .sort((a, b) => a - b)
        .map(itemID => ({ itemID, name: Locales["ja"][`Item/Name/${itemID}`] ?? String(itemID) })),
    []);

    const { pageItems, currentPage, totalPages, setPage } = usePagedItems(entries, PageSize);

    return (
        <div className={style.page}>
            <h1>装備アイテムのツールチップ（{entries.length}件）</h1>
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
            <div className={style.grid}>
                {pageItems.map(({ itemID, name }) => (
                    <div key={itemID} className={style.card}>
                        <p className={style.label}>{name}（{itemID}）</p>
                        <ItemTooltip itemID={itemID} showEquation isDavid={false} config={config} status={status} />
                    </div>
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setPage} />
        </div>
    );
};

export default items;
