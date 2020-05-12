import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Welcome from "../components/welcome/Welcome";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Welcome page', () => {
    it('displays a welcome message with the correct name for user `Forename Surname`', () => {
        const userDetails = {
            display_name: "Dolly Parton"
        }
        const expectedName = "Dolly"

        act(() => {
            render(<Welcome userDetails={userDetails} />, container);
        });
        expect(container.textContent).toContain("Hi " + expectedName + "!");
    });

    it('displays a welcome message with the correct name for user `Forename`', () => {
        const userDetails = {
            display_name: "Cher"
        }
        const expectedName = "Cher"
        act(() => {
            render(<Welcome userDetails={userDetails} />, container);
        });
        expect(container.textContent).toContain("Hi " + expectedName + "!");
    })

    it('displays a welcome message when no display name is provided by the api', () => {
        const userDetails = {}
        const expectedName = "Spotify user"
        act(() => {
            render(<Welcome userDetails={userDetails} />, container);
        });
        expect(container.textContent).toContain("Hi " + expectedName + "!");
    })
})
