import { render, fireEvent } from "@testing-library/react";
import { AppNav } from "../../components/AppNav";
import React from "react";

let clicked = false;

jest.mock("next-auth/react", () => {
    return {
        useSession: jest.fn(() => {
            return {
                status: "authenticated",
            };
        }),
        signOut: jest.fn(() => {
            clicked = true;
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
        const logOut = getByText(/Log out/i);

        expect(dashBoard.tagName).toBe("BUTTON");
        expect(logOut.tagName).toBe("BUTTON");
    });

    it("with user not authenticated should render the component and check the existence of the nav links", () => {
        const { getByText } = render(<AppNav />);
        try {
            getByText(/Sign In/i);
            fail();
        } catch (err) {
            expect(err).not.toBe(null);
        }
    });

    it("should render the component and check the existence of the nav links and click event", () => {
        const { getByText } = render(<AppNav />);
        // const dashBoard = getByText(/Dashboard/i);
        const logOut = getByText(/Log out/i);

        logOut.click();

        expect(clicked).toBe(true);
    });
});
