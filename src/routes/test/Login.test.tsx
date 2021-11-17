import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import Login from "../Login";
import AuthRoute from "../../auth/AuthRoute";
import { RegisterResponse } from "../../api/RegisterResponse";

const fakeRegisterResponse: RegisterResponse = {
    data: {
        client_id: "ju16a6m81mhid5ue1z3v2g0uh",
        email: "test@gmail.com",
        sl_token: "smslt_da85516750eb3_e54c5732d278c3"
    }
}

function FakeGuardedRoute() {
    return (
        <div>Guarded content</div>
    )
}

describe("Login route", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify(fakeRegisterResponse));
    })

    test("renders login form", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const formSubmitButton = screen.getByRole(/submitButton/);
        const formNameField = screen.getByPlaceholderText("Name");
        const formEmailField = screen.getByPlaceholderText("E-mail");
        expect(formSubmitButton).toBeInTheDocument();
        expect(formNameField).toBeInTheDocument();
        expect(formEmailField).toBeInTheDocument();
    });

    test("handles login proces", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/login"]}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="posts" element={
                            <AuthRoute>
                                <FakeGuardedRoute />
                            </AuthRoute>
                        } />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const formSubmitButton = screen.getByRole(/submitButton/);
        const formNameField = screen.getByPlaceholderText("Name");
        const formEmailField = screen.getByPlaceholderText("E-mail");

        fireEvent.change(formNameField, { target: { value: "fakeName" } });
        fireEvent.change(formEmailField, { target: { value: "test@gmail.com" } });
        fireEvent.click(formSubmitButton);

        await waitFor(() => screen.getByText("Guarded content"));

        const guardedContent = screen.getByText("Guarded content");

        expect(guardedContent).toBeInTheDocument();
    });
});