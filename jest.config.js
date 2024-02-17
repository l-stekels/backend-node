module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "^@controllers/(.*)$": "<rootDir>/src/api/forecast/controllers/$1",
        "^@services/(.*)$": "<rootDir>/src/api/forecast/services/$1",
        "^@daos/(.*)$": "<rootDir>/src/api/forecast/daos/$1",
        "^@mocks/(.*)$": "<rootDir>/__tests__/mocks/$1",
    }
}