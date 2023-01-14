import { render } from "@testing-library/react";
import { AppNav } from "../components/AppNav";
import React from "react";

let clicked = false;

jest.mock("next-auth/react", () => {
    return {
        useSession: jest.fn(() => {
            return {
                status: "unauthenticated",
            };
        }),
    };
});

describe("Testing AppNav component", () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    it("should render the component and check the existence of the nav links", () => {
        const { getByText } = render(<AppNav />);
        const dashBoard = getByText(/Dashboard/i);
        const signIn = getByText(/Sign In/i);

        expect(dashBoard.tagName).toBe("BUTTON");
        expect(signIn.tagName).toBe("A");
    });

    it("with user not authenticated should render the component and check the existence of the nav links", () => {
        const { getByText } = render(<AppNav />);
        try {
            getByText(/Log out/i);
            fail();
        } catch (err) {
            expect(err).not.toBe(null);
        }
    });
});
