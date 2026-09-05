import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { autoActiveEffectsOf } from "./auto-active-effects";
import AutoBuffRow from "../components/auto-buff-row.view";

/**
 * 現在体力割合などの条件によって自動的に発動する自己バフ（`perpetualStatus`由来）の一覧。
 * `self-buffs.tsx`（ユーザーが着脱を選ぶ自己バフ）とは別枠で表示する。ユーザー操作を持たない
 * 読み取り専用の表示のみで、条件を満たさなくなれば該当行は自動的に消える（`autoActiveEffectsOf`参照）
 */
const AutoSelfBuffs: React.FC = () => {
    const status = useSubjectStateStore(s => s.status);
    const groups = autoActiveEffectsOf(status);

    return (
        groups.length == 0 ?
        <p><FormattedMessage id="app.buff-debuff.no-auto-self-buff" /></p> :
        <ul>
            {
                groups.map(group => (
                    <AutoBuffRow key={group.nameIntlID} nameIntlID={group.nameIntlID} effects={group.effects} />
                ))
            }
        </ul>
    );
};

export default AutoSelfBuffs;
