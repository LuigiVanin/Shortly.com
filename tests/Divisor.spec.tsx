import { render } from "@testing-library/react";
import { Divisor } from "../components/Divisor";
import { faker } from "@faker-js/faker";
import { fail } from "assert";
import React from "react";

describe("Testing divisor comopnent", () => {
    it("should render the component", () => {
        const text = faker.word.verb();
        const regex = new RegExp(text, "i");
        const { getByText } = render(<Divisor>{text}</Divisor>);

        const divisorElement = getByText(regex);
        // console.log(divisorElement);
        expect(divisorElement).not.toBe(null);
    });

    it("should render the component and not find other things", () => {
        const text = faker.word.verb();
        const wrongText = faker.word.verb();
        const { getByText } = render(<Divisor>{text}</Divisor>);

        try {
            getByText(wrongText);
            fail("Should not find this text");
        } catch (err) {
            expect(err).not.toBe(null);
        }
    });

    it("should render with nested element inside", () => {
        const text = faker.word.verb();
        const { getByText, container } = render(
            <Divisor>
                <span>{text}</span>
            </Divisor>
        );

        const divisorElement = getByText(text);
        expect(divisorElement).not.toBe(null);
        expect(divisorElement.tagName).toBe("SPAN");
    });
});
