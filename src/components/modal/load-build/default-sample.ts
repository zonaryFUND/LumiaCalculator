import { BuildWithKey } from "@app/storage/build";

export const defaultSampleBuilds: BuildWithKey[] = [
    {
        name: "サンプル1：フルビルドEleven",
        key: 0,
        isPreset: true,
        config: {
            subject: "eleven",
            equipment: {
                weapon: "squeaky_hammer",
                chest: "blazing_dress",
                head: "mythril_helm",
                arm: "centipede_s_pauldron",
                leg: "boots_of_hermes"
            },
            level: 20,
            weaponMastery: 20,
            defenseMastery: 20,
            movementMastery: 20,
            skillLevels: {
                Q: 4, W: 4, E: 4, R: 2, T: 2
            },
            gauge: 0,
            stack: 0
        }
    }
]
;