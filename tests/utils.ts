import { faker } from "@faker-js/faker";

export const generateContentData = () => {
    return {
        link: faker.internet.url(),
        short: faker.random.alphaNumeric(6),
        shortId: faker.random.alphaNumeric(6),
    };
};
