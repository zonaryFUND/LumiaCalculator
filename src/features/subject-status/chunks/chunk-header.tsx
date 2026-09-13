import * as React from "react";
import table from "components/common/table.module.styl";
import style from "./chunk-header.module.styl";
import { FormattedMessage } from "react-intl";
import { CaretRight } from "@phosphor-icons/react";

type Props = {
    intlID: string;
    additionalHead?: React.ReactNode;
    hidden: boolean;
    toggleHidden: () => void;
}

/**
 * ステータステーブルのカテゴリ開閉ヘッダー。`ingame-params`のダメージテーブル側
 * （`features/damage/components/simple/subtable.tsx`・`features/damage/containers/combat/subtables/
 * subtable.tsx`）と同じ「シェブロンをヘッダー左側に配置し、開閉に応じて回転させる」表現に統一している。
 *
 * `features/subject-status/index.tsx`が`<IconContext.Provider value={{size: 18}}>`でこの配下全体を
 * 包んでいる（各ステータス項目アイコンを文字サイズに関わらず統一18pxで揃えるための既存の設計）ため、
 * このシェブロンだけ明示的に`size="1em"`を指定してコンテキストの既定値を上書きし、ダメージテーブル側の
 * シェブロン（テキストに追従する`1em`）と挙動を揃えている
 */
const ChunkHeader: React.FC<Props> = ({intlID, additionalHead, hidden, toggleHidden}) => {
    return (
        <tr className={table.separator} onClick={toggleHidden}>
            <td colSpan={2}>
                <div className={hidden ? `${style.header} ${style.collapsed}` : style.header}>
                    <CaretRight weight="bold" size="1em" />
                    <FormattedMessage id={intlID} />{additionalHead}
                </div>
            </td>
        </tr>
    );
}

export default ChunkHeader;
