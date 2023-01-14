module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["**/tests/**/?(*.)+(spec|test).ts?(x)"],
    // globals: {
    //     "ts-jest": {
    //         tsconfig: "tsconfig.test.json",
    //     },
    // },
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            { tsconfig: "tsconfig.test.json", isolatedModules: true },
        ],
        "^.+\\.jsx?$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "jest-css-modules",
    },
};

export {};
