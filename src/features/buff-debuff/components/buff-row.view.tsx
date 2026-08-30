import * as React from "react";
import { FormattedMessage } from "react-intl";
import Decimal from "decimal.js";
import PullDown from "components/common/pull-down";
import style from "./buff-row.module.styl";

export type Effect = {
    // 仮でStatusのkeyをそのまま表示する（intlID経由の翻訳表示は別途対応予定）
    label: string
    value: Decimal.Value
    percent: boolean
}

type Props = {
    nameIntlID: string
    maxStack: number
    currentStack: number
    effects: Effect[]
    onChange: (stack: number) => void
    onRemove?: () => void
}

/**
 * バフ・デバフ1件ぶんの、名称・スタック変更UI・現在のスタックにおける効果を表示する行。
 * 自己バフ（`self-buffs.tsx`）・他者バフ（`incoming-buffs.tsx`）の両コンテナで共有する
 *
 * スタックの最大値が1（1スタックのみ可能なバフ）の場合はチェックボックス、それ以外
 * （複数スタック可能・切り替え式）の場合はプルダウンで表示する。スタックが0の間は効果を表示しない。
 * `onRemove`が指定された場合のみ削除ボタンを表示する（他者バフのみ削除可能で、自己バフは削除不可のため）
 */
const BuffRow: React.FC<Props> = props => {
    const isCheckbox = props.maxStack == 1;
    const stackOptions = React.useMemo(
        () => Array.from({ length: props.maxStack + 1 }, (_, i) => String(i)),
        [props.maxStack]
    );

    return (
        <li className={style.row}>
            <div className={style.header}>
                <span className={style.name}><FormattedMessage id={props.nameIntlID} /></span>
                {
                    isCheckbox ?
                    <input
                        type="checkbox"
                        checked={props.currentStack == 1}
                        onChange={e => props.onChange(e.target.checked ? 1 : 0)}
                    /> :
                    <PullDown
                        layout="config"
                        value={{
                            list: stackOptions,
                            current: String(props.currentStack),
                            set: (value: string) => props.onChange(Number(value))
                        }}
                    />
                }
                {
                    props.onRemove ?
                    <button type="button" className={style.remove} onClick={props.onRemove}>×</button> :
                    null
                }
            </div>
            {
                props.effects.length > 0 ?
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
                </ul> : null
            }
        </li>
    );
};

export default BuffRow;
