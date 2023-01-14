import { faker } from "@faker-js/faker";
import { fireEvent, getByText, render } from "@testing-library/react";
import { PopUp } from "../../components/PopUp";
import React from "react";

test("Testing PopUp rendering - it should render the backdrop and popup components", () => {
    const text = faker.word.verb();
    const { getByTestId, getByText } = render(
        <PopUp show={true} disable={() => {}}>
            {text}
        </PopUp>
    );

    const popup = getByTestId("popup");
    const backdrop = getByTestId("backdrop");

    const popupElement = getByText(text);
    expect(popupElement.className.split(" ")).toContain("relative");
    expect(popup.className.split(" ")).toContain("relative");
    expect(backdrop.className.split(" ")).toContain("fixed");
});

test("Testing popup beahaviour with false show state", () => {
    const text = faker.word.verb();
    const { getByTestId } = render(
        <PopUp show={false} disable={() => {}}>
            {text}
        </PopUp>
    );
    try {
        getByTestId("popup");
        fail();
    } catch (err) {
        expect(err).not.toBe(null);
    }
});

test("Testing popup beahaviour no click", () => {
    const text = faker.word.verb();
    let mockState = true;
    const disableFn = () => {
        mockState = false;
    };
    const { getByTestId } = render(
        <PopUp show={mockState} disable={disableFn}>
            {text}
        </PopUp>
    );

    const backdrop = getByTestId("backdrop");
    const popup = getByTestId("popup");

    fireEvent.click(popup);

    expect(mockState).toBe(true);

    fireEvent.click(backdrop);

    expect(mockState).toBe(false);
});
