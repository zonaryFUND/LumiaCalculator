import { PresetWithKey } from "@app/storage/preset";

export const DefaultSamplePresets: PresetWithKey[] = [
    {
        version: "v2",
        name: "サンプル1：フルビルドEleven",
        key: 0,
        isPremadeSample: true,
        config: {
            subject: 30,
            equipment: {
                Weapon: 104502,
                Chest: 202522,
                Head: 201415,
                Arm: 705601,
                Leg: 204501
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