const subjectContext = require.context("./", true, /\.\/.*\/stack\.ts$/);

export const SubjectStackInfo = subjectContext.keys().reduce((skills: any, path) => {
    const key = path.substring(2, path.lastIndexOf("/"));
    skills[key] = subjectContext(path);
    return skills;
}, {}) as any