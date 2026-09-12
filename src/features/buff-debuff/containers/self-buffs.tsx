import * as React from "react";
import { useToggle } from "react-use";
import Modal from "react-modal";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import { selfBuffDefinitionsOf } from "@app/ingame-params/buff-debuff/self-buff-definitions";
import { selectableSelfBuffCatalogOf } from "@app/ingame-params/buff-debuff/selectable-self-buff-catalog";
import { itemIDFromNamespacedId } from "@app/ingame-params/buff-debuff/source";
import BuffRow from "../components/buff-row.view";
import { effectsOf } from "./effects";
import { FormattedMessage } from "react-intl";
import common from "@app/common.module.styl";
import style from "./self-buffs.module.styl";

/**
 * 選択中の実験体の自己バフ一覧。実験体・装備選択に応じて自動投入されたもの（`origin: "skill" |
 * "equipment-ability"`）は削除ボタンを持たず、ユーザーが自ら追加したもの（`origin: "augment" |
 * "tactical-skill" | "misc"`。特性・戦術スキル・その他恒久バフ）は`incoming-buffs.tsx`と同様の
 * 追加・削除UIを持つ（`selectableSelfBuffCatalogOf`参照）
 */
const SelfBuffs: React.FC = () => {
    const config = useSubjectStateStore(s => s.config);
    const status = useSubjectStateStore(s => s.status);
    const hpRatio = useSubjectStateStore(s => s.hpRatio);
    const setSelfBuffs = useSubjectStateStore(s => s.setSelfBuffs);
    const [adding, toggleAdding] = useToggle(false);

    const definitions = selfBuffDefinitionsOf(config, status, hpRatio);
    const catalog = selectableSelfBuffCatalogOf(config, status, hpRatio);
    const addedIds = new Set(config.selfBuffs.map(s => s.id));
    const addableEntries = Object.entries(catalog).filter(([id]) => !addedIds.has(id));

    const onAdd = (id: string) => {
        setSelfBuffs(prev => [...prev, { id, stack: 0 }]);
        toggleAdding(false);
    };

    return (
        <>
            {
                config.selfBuffs.length == 0 ?
                <p><FormattedMessage id="app.buff-debuff.no-self-buff" /></p> :
                <ul>
                    {
                        config.selfBuffs.map(state => {
                            const definition = definitions[state.id];
                            if (!definition) return null;

                            // 実験体・装備選択に応じて自動投入されるもの（skill/equipment-ability）は削除不可。
                            // ユーザーが自ら追加したもの（augment/tactical-skill/misc）のみ削除ボタンを出す
                            const removable = definition.origin != "skill" && definition.origin != "equipment-ability";

                            // 実験体固有スキル由来（origin: "skill"）は発生源が選択中の実験体自身で自明なため、
                            // 発生源名は装備アビリティ由来のときだけ表示する
                            const itemID = definition.origin == "equipment-ability" ? itemIDFromNamespacedId(state.id) : undefined;

                            return (
                                <BuffRow
                                    key={state.id}
                                    nameIntlID={definition.nameIntlID}
                                    sourceIntlID={itemID != undefined ? `Item/Name/${itemID}` : undefined}
                                    maxStack={definition.maxStack}
                                    stackLabels={definition.stackLabels}
                                    excludeNoneOption={definition.excludeNoneOption}
                                    currentStack={state.stack}
                                    effects={effectsOf(definition, state.stack)}
                                    onChange={stack => setSelfBuffs(prev => prev.map(
                                        s => s.id == state.id ? { ...s, stack } : s
                                    ))}
                                    onRemove={removable ? () => setSelfBuffs(prev => prev.filter(s => s.id != state.id)) : undefined}
                                />
                            );
                        })
                    }
                </ul>
            }
            <button type="button" className={style.add} onClick={toggleAdding}>
                <FormattedMessage id="app.buff-debuff.add-self-buff" />
            </button>
            <Modal
                isOpen={adding}
                shouldCloseOnOverlayClick
                onRequestClose={toggleAdding}
                className={style.list}
                overlayClassName={common["modal-overlay"]}
            >
                <h1><FormattedMessage id="app.buff-debuff.add-self-buff" /></h1>
                {
                    addableEntries.length == 0 ?
                    <p><FormattedMessage id="app.buff-debuff.no-addable-self-buff" /></p> :
                    <ul>
                        {
                            addableEntries.map(([id, definition]) => (
                                <li key={id} className={common["hover-bright"]} onClick={() => onAdd(id)}>
                                    <FormattedMessage id={definition.nameIntlID} />
                                </li>
                            ))
                        }
                    </ul>
                }
            </Modal>
        </>
    );
};

export default SelfBuffs;
