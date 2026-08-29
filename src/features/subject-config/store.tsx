import * as React from "react";
import { Equipment, SkillLevels, SubjectConfig, SubjectConfigDefault } from "core/subject-dynamic/config";
import { SubjectCode } from "core/subject-static";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware"
import { Migrate } from "@app/storage/migration-v1/config";
import { Status } from "core/subject-dynamic/status/type";
import { statusOf } from "core/subject-dynamic/status/calculation";

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
                    const config = updater(prev.config);
                    return {
                        config,
                        status: statusOf(config, 100)
                    }
                }),
                setConfig: (config: SubjectConfig) => get()._updateConfig(() => config),
                setSubject: (subject: SubjectCode) => get()._updateConfig(prev => ({
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
                })),
                setEquipment: (equipment: React.SetStateAction<Equipment>) => get()._updateConfig(prev => ({
                    ...prev,
                    equipment: typeof equipment === "function" ? equipment(prev.equipment) : equipment
                })),
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
                setGauge: (gauge: React.SetStateAction<number>) => get()._updateConfig(prev => ({
                    ...prev,
                    gauge: typeof gauge === "function" ? gauge(prev.gauge) : gauge
                })),
                setStack: (stack: React.SetStateAction<number>) => get()._updateConfig(prev => ({
                    ...prev,
                    stack: typeof stack === "function" ? stack(prev.stack) : stack
                })),
                setHpRatio: (hpRatio: React.SetStateAction<number>) => set(prev => ({
                    ...prev,
                    hpRatio: typeof hpRatio === "function" ? hpRatio(prev.hpRatio) : hpRatio
                }))
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
                    // （SubjectConfigへの新規フィールド追加時、古いデータを読み込んでも欠落しないようにする防御）
                    const restoredConfig = persistedState.config
                        ? { ...SubjectConfigDefault, ...persistedState.config }
                        : currentState.config;
                    return {
                        ...currentState,
                        config: restoredConfig,
                        status: statusOf(restoredConfig, 100)
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