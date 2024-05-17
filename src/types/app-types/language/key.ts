const AppTextKeys = [
    "subject",　"equipment",
    "max-hp"
] as const;

export type AppTextKey = typeof AppTextKeys[number];