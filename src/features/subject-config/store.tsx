import * as React from "react";
import { BuffDebuffState, Equipment, SkillLevels, SubjectConfig, SubjectConfigDefault, sanitizeConfig } from "core/subject-dynamic/config";
import { SubjectCode } from "core/subject-static";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware"
import { Migrate } from "@app/storage/migration-v1/config";
import { Status } from "core/subject-dynamic/status/type";
import { statusOf } from "core/subject-dynamic/status/calculation";
import { reconcileSelfBuffs } from "@app/ingame-params/buff-debuff/self-buff-definitions";

type SubjectStateStore = {
    config: SubjectConfig
    status: Status
    hpRatio: number

    // 状態更新の反映　内部からしか呼ばない
    _updateConfig: (updater: (prev: SubjectConfig) => SubjectConfig) => void

    // 公開アクション
    setConfig: (config: SubjectConfig) => void
    setSubject: (subject: SubjectCode) => void
    setEquipment: (equipment: React.SetStateAction<Equipment>) => void
    setLevel: (level: number) => void
    setWeaponMastery: (weaponMastery: number) => void
    setDefenseMastery: (defenseMastery: number) => void
    setMovementMastery: (movementMastery: number) => void
    setSkillLevels: (skillLevels: React.SetStateAction<SkillLevels>) => void
    setSelfBuffs: (selfBuffs: React.SetStateAction<BuffDebuffState[]>) => void
    setIncomingBuffs: (incomingBuffs: React.SetStateAction<BuffDebuffState[]>) => void
    setGauge: (gauge: React.SetStateAction<number>) => void
    setStack: (stack: React.SetStateAction<number>) => void
    setHpRatio: (hpRatio: React.SetStateAction<number>) => void
}

export function createSubjectConfigStore(storageKey: string) {
    return createStore<SubjectStateStore>()(
        persist(
            (set, get) => ({
                config: SubjectConfigDefault,
                status: statusOf(SubjectConfigDefault, 100),
                hpRatio: 100,
                _updateConfig: updater => set(prev => {
                    // すべての更新経路（setConfig経由のプリセット読み込みも含む）で、存在しなくなった
                    // 装備アイテムIDなどを安全な既定値に戻す（core/subject-dynamic/config/sanitize.ts参照）
                    const config = sanitizeConfig(updater(prev.config));
                    return {
                        config,
                        status: statusOf(config, prev.hpRatio)
                    }
                }),
                setConfig: (config: SubjectConfig) => get()._updateConfig(() => config),
                setSubject: (subject: SubjectCode) => get()._updateConfig(prev => {
                    const next: SubjectConfig = {
                        ...prev,
                        subject,
                        equipment: {
                            Weapon: null,
                            Head: null,
                            Chest: null,
                            isChestDavid: false,
                            Arm: null,
                            Leg: null
                        },
                        skillLevels: {Q: 0, W: 0, E: 0, R: 0, T: 0},
                        gauge: 0,
                        stack: 0,
                        selfBuffs: [], // 実験体ごとに保存されるものではないため、切り替え時に一旦空にしたうえで再構築する
                        incomingBuffs: []
                    };

                    // 実験体固有の自己バフを、スタック0の状態であらためて投入する。reconcileSelfBuffsは
                    // 効果量の数値ではなくキー集合しか見ないため、この時点のnext（selfBuffsはまだリセット
                    // 直後の空配列）から計算したpreliminaryなStatusで十分
                    return { ...next, selfBuffs: reconcileSelfBuffs(next, statusOf(next, 100), 100) };
                }),
                setEquipment: (equipment: React.SetStateAction<Equipment>) => get()._updateConfig(prev => {
                    const nextEquipment = typeof equipment === "function" ? equipment(prev.equipment) : equipment;
                    const next: SubjectConfig = { ...prev, equipment: nextEquipment };

                    // 装備由来の自己バフを、新しい装備構成に応じてselfBuffsへ追加・削除する
                    // （外れた装備の自己バフはselfBuffDefinitionsOf(next)に含まれなくなるため自動的に取り除かれる）
                    return { ...next, selfBuffs: reconcileSelfBuffs(next, statusOf(next, 100), 100) };
                }),
                setLevel: (level: number) => get()._updateConfig(prev => ({
                    ...prev,
                    level
                })),
                setWeaponMastery: (weaponMastery: number) => get()._updateConfig(prev => ({
                    ...prev,
                    weaponMastery
                })),
                setDefenseMastery: (defenseMastery: number) => get()._updateConfig(prev => ({
                    ...prev,
                    defenseMastery
                })),
                setMovementMastery: (movementMastery: number) => get()._updateConfig(prev => ({
                    ...prev,
                    movementMastery
                })),
                setSkillLevels: (skillLevels: React.SetStateAction<SkillLevels>) => get()._updateConfig(prev => ({
                    ...prev,
                    skillLevels: typeof skillLevels === "function" ? skillLevels(prev.skillLevels) : skillLevels
                })),
                setSelfBuffs: (selfBuffs: React.SetStateAction<BuffDebuffState[]>) => get()._updateConfig(prev => ({
                    ...prev,
                    selfBuffs: typeof selfBuffs === "function" ? selfBuffs(prev.selfBuffs) : selfBuffs
                })),
                setIncomingBuffs: (incomingBuffs: React.SetStateAction<BuffDebuffState[]>) => get()._updateConfig(prev => ({
                    ...prev,
                    incomingBuffs: typeof incomingBuffs === "function" ? incomingBuffs(prev.incomingBuffs) : incomingBuffs
                })),
                setGauge: (gauge: React.SetStateAction<number>) => get()._updateConfig(prev => ({
                    ...prev,
                    gauge: typeof gauge === "function" ? gauge(prev.gauge) : gauge
                })),
                setStack: (stack: React.SetStateAction<number>) => get()._updateConfig(prev => ({
                    ...prev,
                    stack: typeof stack === "function" ? stack(prev.stack) : stack
                })),
                setHpRatio: (hpRatio: React.SetStateAction<number>) => set(prev => {
                    const nextHpRatio = typeof hpRatio === "function" ? hpRatio(prev.hpRatio) : hpRatio;
                    return {
                        ...prev,
                        hpRatio: nextHpRatio,
                        status: statusOf(prev.config, nextHpRatio)
                    };
                })
            }),
            {
                name: storageKey,
                version: 1, // Zustand管理開始バージョン
                migrate: (persistedState: any, version) => {
                    // ===============================================
                    // Zustand管理開始前バージョンの判定
                    // ===============================================
                    // Zustandは { config: {...} } の形式で保存されるため、
                    // configプロパティが存在しない場合はZustand管理開始以前のデータと判断する
                    if (persistedState && !("config" in persistedState)) {
                        if (persistedState.version === "v2") {
                            // { version: "v2" }が付与されている場合、Zustand管理開始前最後のデータ
                            const { version: _, ...config } = persistedState;
                            return { config }
                        } else {
                            // versionが付与されていない場合、一番最初のデータ
                            return { config: Migrate(persistedState) }
                        }
                    }
                    
                    // ===============================================
                    // Zustand管理開始後のバージョンの判定
                    // ===============================================
                    // 現在、Zustand管理開始後のマイグレーションは存在していない
                    return persistedState;
                },
                partialize: state => ({ config: state.config }),
                merge: (persistedState: any, currentState) => {
                    // 保存済みデータに存在しないフィールドはSubjectConfigDefault側の値で補う
                    // （SubjectConfigへの新規フィールド追加時、古いデータを読み込んでも欠落しないようにする防御）。
                    // sanitizeConfigで、存在しなくなった装備アイテムIDなども併せて安全な既定値に戻す
                    // （statusOf()に渡す前に行う必要がある。装備アイテムIDへの参照はstatusOf内部でも
                    // 無条件に行われるため、ここで正規化しないとreconcileSelfBuffsの呼び出しでクラッシュしうる）
                    const restoredConfig = persistedState.config
                        ? sanitizeConfig({ ...SubjectConfigDefault, ...persistedState.config })
                        : currentState.config;

                    // 保存済みのselfBuffsを、現在のコード上の自己バフ定義と突き合わせて再構築する。
                    // 保存後に対象実験体・装着中の装備へ新しい自己バフ定義が追加された場合でも、
                    // 実験体・装備を選び直すまで反映されないままになるのを防ぐ（selfBuffsは
                    // setSubject/setEquipment経由でしか更新されないため、復元時にも同じ導出をかけ直す必要がある）
                    const config = { ...restoredConfig, selfBuffs: reconcileSelfBuffs(restoredConfig, statusOf(restoredConfig, 100), 100) };

                    return {
                        ...currentState,
                        config,
                        status: statusOf(config, 100)
                    }
                }
            }
        )
    )
}

const SubjectConfigStoreContext = createContext<ReturnType<typeof createSubjectConfigStore> | null>(null);

/**
 * 呼び出し元が既に生成済みのstoreをContext経由で子孫に公開するだけの汎用Provider。
 *
 * 対戦モードのように、Provider配下（実験体設定・スキル・ステータス）とは別の場所
 * （中央のダメージ計算結果カラムなど）でも同じstoreの値を読みたい場合、呼び出し元が
 * `createSubjectConfigStore`で自分でstoreを生成して保持し、このProviderにも渡す。
 */
export function SubjectConfigStoreProvider(props: {
    store: ReturnType<typeof createSubjectConfigStore>,
    children: React.ReactNode
}) {
    return (
        <SubjectConfigStoreContext.Provider value={props.store}>
            {props.children}
        </SubjectConfigStoreContext.Provider>
    )
}

export function useSubjectStateStore<T>(selector: (state: SubjectStateStore) => T): T {
    const store = useContext(SubjectConfigStoreContext);
    if (store == null) {
        throw new Error("useSubjectStateStore must be used within a SubjectProvider");
    }
    return useStore(store, selector);
}