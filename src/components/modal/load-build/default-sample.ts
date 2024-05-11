import { SubjectConfig } from "components/subject/use-subject-config";

export const defaultSampleBuilds: [string, number, SubjectConfig][] = [
    [
        "サンプル1：フルビルドEleven",
        0,
        {
            subject: "eleven",
            equipment: {
                weapon: "squeaky_hammer",
                chest: "blazing_dress",
                head: "mithril_helm",
                arm: "centipede_s_spauldron",
                leg: "boots_of_hermes"
            },
            level: 20,
            weaponMastery: 20,
            defenseMastery: 20,
            movementMastery: 20,
            skillLevels: {
                Q: 5, W: 5, E: 5, R: 3, T: 3
            },
            gauge: 0,
            stack: 0
        }
    ]
]