import * as React from "react";
import { FormattedMessage } from "react-intl";
import PullDown from "components/common/pull-down";
import style from "./self-buff-row.module.styl";

type Props = {
    nameIntlID: string
    availableStacks: number[]
    currentStack: number
    onChange: (stack: number) => void
}

/**
 * 自己バフ1件ぶんの、名称とスタック変更UIを表示する行
 *
 * 選択可能なスタックが[0, 1]のみ（1スタックのみ可能なバフ）の場合はチェックボックス、
 * それ以外（複数スタック可能・切り替え式）の場合はプルダウンで表示する
 */
const SelfBuffRow: React.FC<Props> = props => {
    const isCheckbox = props.availableStacks.length == 2
        && props.availableStacks[0] == 0
        && props.availableStacks[1] == 1;

    return (
        <li className={style.row}>
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
                        list: props.availableStacks.map(String),
                        current: String(props.currentStack),
                        set: (value: string) => props.onChange(Number(value))
                    }}
                />
            }
        </li>
    );
};

export default SelfBuffRow;
