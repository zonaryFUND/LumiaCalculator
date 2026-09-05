import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";
import { Effect } from "./buff-row.view";
import style from "./buff-row.module.styl";

type Props = {
    nameIntlID: string
    effects: Effect[]
}

/**
 * 条件（現在体力割合など）に応じて自動的に発動する効果（`perpetual_status`由来）1件ぶんの行。
 * `buff-row.view.tsx`（自己バフ・他者バフ共通）と異なり、ユーザーが操作するスタック切り替え・削除ボタンを
 * 持たない読み取り専用の表示のみ（`auto-self-buffs.tsx`参照）。見た目を揃えるため`buff-row.module.styl`の
 * クラスを共有する
 */
const AutoBuffRow: React.FC<Props> = props => (
    <li className={style.row}>
        <div className={style.header}>
            <span className={style.name}>
                <FormattedMessage id={props.nameIntlID} />
            </span>
        </div>
        <ul className={style.effects}>
            {
                props.effects.map((effect, i) => {
                    const value = new Decimal(effect.value);
                    return (
                        <li key={`${effect.label}-${i}`}>
                            {effect.label}:
                            {value.greaterThanOrEqualTo(0) ? "+" : ""}
                            {value.toString()}
                            {effect.percent ? "%" : ""}
                        </li>
                    );
                })
            }
        </ul>
    </li>
);

export default AutoBuffRow;
