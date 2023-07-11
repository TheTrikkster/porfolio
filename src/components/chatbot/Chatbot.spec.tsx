import React from 'react';
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import Chatbot from "./Chatbot";

describe("Chatbot input behavior", () => {
    let input: HTMLElement;

    beforeEach(() => {
        render(<Chatbot />)
        input = screen.getByRole("textbox");
    });

    it("should allow user to fill the input", () => {
        fireEvent.change(input, {target: {value: "hello"}})
        expect(input).toHaveValue("hello");
    })

    it("should not be disabled by default", () => {
        expect(input).not.toHaveAttribute("disabled")
    })

    it("should be a required field", () => {
        expect(input).toHaveAttribute("required")
    })
})

describe("Chatbot interaction with OpenAI API", () => {
    global.fetch = jest.fn();
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    let input: HTMLElement;
    let button: HTMLElement;

    beforeEach(() => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ role: "assistant", content: "Hello World" }),
        } as any);

        render(<Chatbot />)
        input = screen.getByRole("textbox");
        button = screen.getByRole("button");
    });

    it("should display API response after user interaction", async () => {
        fireEvent.change(input, {target: {value: "hello"}})
        fireEvent.click(button)

        await waitFor(() => expect(screen.getByText("Hello World")).toBeInTheDocument()) 
    })

    it("should disable the input during the API call", async () => {
        fireEvent.change(input, {target: {value: "hello"}})
        fireEvent.click(button)

        expect(input).toHaveAttribute("disabled")
        await waitFor(() =>  expect(input).not.toHaveAttribute("disabled")) 
    })

    it("should display the loader during the API call", async () => {
        fireEvent.change(input, {target: {value: "hello"}})
        fireEvent.click(button)

        const loader = screen.getByRole("status")
    
        expect(loader).toBeInTheDocument();
        await waitForElementToBeRemoved(loader)
        expect(loader).not.toBeInTheDocument();
    })
})