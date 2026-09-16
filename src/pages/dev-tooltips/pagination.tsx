import * as React from "react";
import { useSearchParams } from "react-router-dom";
import style from "./tooltip-grid.module.styl";

/**
 * 配列をページ単位に切り出す。ページ番号はURLの?pageクエリパラメータに保持する
 * （ページ送り後もブラウザの戻る/進むやリロードで位置が保たれるようにするため）
 */
export function usePagedItems<T>(items: T[], pageSize: number) {
    const [searchParams, setSearchParams] = useSearchParams();
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(Math.max(1, Number(searchParams.get("page") ?? "1") || 1), totalPages);
    const pageItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const setPage = React.useCallback((page: number) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set("page", String(page));
            return next;
        });
    }, [setSearchParams]);

    return { pageItems, currentPage, totalPages, setPage };
}

type Props = {
    currentPage: number
    totalPages: number
    onChange: (page: number) => void
}

const pagination: React.FC<Props> = ({ currentPage, totalPages, onChange }) => {
    return (
        <nav className={style.pagination}>
            <button type="button" disabled={currentPage <= 1} onClick={() => onChange(currentPage - 1)}>← 前へ</button>
            <select value={currentPage} onChange={e => onChange(Number(e.target.value))}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => <option key={p} value={p}>{p} / {totalPages}ページ</option>)}
            </select>
            <button type="button" disabled={currentPage >= totalPages} onClick={() => onChange(currentPage + 1)}>次へ →</button>
        </nav>
    );
};

export default pagination;
