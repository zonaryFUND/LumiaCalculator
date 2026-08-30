import * as React from "react";
import { useToggle } from "react-use";
import Modal from "react-modal";
import { FormattedMessage } from "react-intl";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { IncomingBuffDebuffCatalog } from "@app/ingame-params/buff-debuff/incoming-catalog";
import { incomingBuffSourceIntlID } from "@app/ingame-params/buff-debuff/source";
import BuffRow from "../components/buff-row.view";
import { effectsOf } from "./effects";
import common from "@app/common.module.styl";
import style from "./incoming-buffs.module.styl";

/**
 * 他者（敵）から受けるバフ・デバフの一覧。`config.incomingBuffs`はユーザーが「追加」ボタンから
 * `IncomingBuffDebuffCatalog`（実験体スキル由来の「他者へのバフデバフ」定義を全実験体分集約したもの）
 * を選んで追加し、各行の削除ボタンで個別に取り除く。同一idの要素が複数存在しうるため、`id`ではなく
 * 配列インデックスで行を識別する
 */
const IncomingBuffs: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const setIncomingBuffs = useSubjectStateStore(s => s.setIncomingBuffs);
    const [adding, toggleAdding] = useToggle(false);

    const onAdd = (id: string) => {
        setIncomingBuffs(prev => [...prev, { id, stack: 1 }]);
        toggleAdding(false);
    };

    return (
        <>
            {
                config.incomingBuffs.length == 0 ?
                <p><FormattedMessage id="app.buff-debuff.no-incoming-buff" /></p> :
                <ul>
                    {
                        config.incomingBuffs.map((state, index) => {
                            const definition = IncomingBuffDebuffCatalog[state.id];
                            if (!definition) return null;

                            return (
                                <BuffRow
                                    key={index}
                                    nameIntlID={definition.nameIntlID}
                                    sourceIntlID={incomingBuffSourceIntlID(state.id)}
                                    maxStack={definition.maxStack}
                                    stackLabels={definition.stackLabels}
                                    currentStack={state.stack}
                                    effects={effectsOf(definition, state.stack)}
                                    onChange={stack => setIncomingBuffs(prev => prev.map(
                                        (s, i) => i == index ? { ...s, stack } : s
                                    ))}
                                    onRemove={() => setIncomingBuffs(prev => prev.filter((_, i) => i != index))}
                                />
                            );
                        })
                    }
                </ul>
            }
            <button type="button" className={style.add} onClick={toggleAdding}>
                <FormattedMessage id="app.buff-debuff.add-incoming-buff" />
            </button>
            <Modal
                isOpen={adding}
                shouldCloseOnOverlayClick
                onRequestClose={toggleAdding}
                className={style.list}
                overlayClassName={common["modal-overlay"]}
            >
                <h1><FormattedMessage id="app.buff-debuff.add-incoming-buff" /></h1>
                <ul>
                    {
                        Object.entries(IncomingBuffDebuffCatalog).map(([id, definition]) => {
                            const sourceIntlID = incomingBuffSourceIntlID(id);
                            return (
                                <li key={id} className={common["hover-bright"]} onClick={() => onAdd(id)}>
                                    {sourceIntlID ? <><FormattedMessage id={sourceIntlID} />{" "}</> : null}
                                    <FormattedMessage id={definition.nameIntlID} />
                                </li>
                            );
                        })
                    }
                </ul>
            </Modal>
        </>
    );
};

export default IncomingBuffs;
