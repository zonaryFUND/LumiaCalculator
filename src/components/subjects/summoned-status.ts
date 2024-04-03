const subjectContext = require.context("./", true, /\.\/.*\/summoned-status\.ts$/);

export const SummonedStatus = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = subjectContext(path);
    return skills;
}, {}) as any