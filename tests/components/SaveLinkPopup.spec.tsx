import { render } from "@testing-library/react";
import { SaveLinkPopUp } from "../../components/SaveLinkPopUp";
import { generateContentData } from "../utils";
import React from "react";

test("Testing save link popup rendering - must load Popup content", () => {
    const content = generateContentData();
    const { getByTestId, getByText } = render(
        <SaveLinkPopUp show={true} content={content} />
    );

    getByTestId("popup");
    getByTestId("backdrop");
});
