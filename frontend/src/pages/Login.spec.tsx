import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Login from "./Login"
import { useNavigate } from "react-router"

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}))

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
}
Object.defineProperty(window, "localStorage", { value: mockLocalStorage })

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders login form", () => {
    render(<Login />)

    expect(screen.getByText("Login")).toBeInTheDocument()
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
  })

  test("updates email input value", () => {
    render(<Login />)

    const emailInput = screen.getByLabelText("Email Address")
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })

    expect(emailInput).toHaveValue("test@example.com")
  })

  test("updates password input value", () => {
    render(<Login />)

    const passwordInput = screen.getByLabelText("Password")
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    expect(passwordInput).toHaveValue("password123")
  })

  test("displays email error for empty email", async () => {
    render(<Login />)

    const signInButton = screen.getByRole("button", { name: "Sign In" })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText("Email is required.")).toBeInTheDocument()
    })
  })

  test("displays email error for invalid email format", async () => {
    render(<Login />)

    const emailInput = screen.getByLabelText("Email Address")
    fireEvent.change(emailInput, { target: { value: "invalid-email" } })

    const signInButton = screen.getByRole("button", { name: "Sign In" })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email.")).toBeInTheDocument()
    })
  })

  test("displays password error for empty password", async () => {
    render(<Login />)

    const emailInput = screen.getByLabelText("Email Address")
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })

    const signInButton = screen.getByRole("button", { name: "Sign In" })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText("Password is required.")).toBeInTheDocument()
    })
  })

  test("handles successful login", async () => {
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    )

    render(<Login />)

    const emailInput = screen.getByLabelText("Email Address")
    const passwordInput = screen.getByLabelText("Password")
    const signInButton = screen.getByRole("button", { name: "Sign In" })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/portfolio")
    })
  })

  test("handles unsuccessful login", async () => {
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    )

    render(<Login />)

    const emailInput = screen.getByLabelText("Email Address")
    const passwordInput = screen.getByLabelText("Password")
    const signInButton = screen.getByRole("button", { name: "Sign In" })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled()
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    })
  })

  test("handles no credentials in localStorage", async () => {
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    mockLocalStorage.getItem.mockReturnValue(null)

    const consoleSpy = jest.spyOn(console, "log")

    render(<Login />)

    const emailInput = screen.getByLabelText("Email Address")
    const passwordInput = screen.getByLabelText("Password")
    const signInButton = screen.getByRole("button", { name: "Sign In" })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith("No credentials found in localStorage.")
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    })

    consoleSpy.mockRestore()
  })

  test("clears error messages on input change", async () => {
    render(<Login />)

    const emailInput = screen.getByLabelText("Email Address")
    const passwordInput = screen.getByLabelText("Password")
    const signInButton = screen.getByRole("button", { name: "Sign In" })

    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText("Email is required.")).toBeInTheDocument()
      expect(screen.getByText("Password is required.")).toBeInTheDocument()
    })

    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    await waitFor(() => {
      expect(screen.queryByText("Email is required.")).not.toBeInTheDocument()
      expect(screen.queryByText("Password is required.")).not.toBeInTheDocument()
    })
  })
})