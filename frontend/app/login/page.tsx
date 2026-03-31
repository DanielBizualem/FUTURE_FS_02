"use client"
import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        setError("");
        // TODO: Add authentication logic here
        alert(`Logged in as ${email}`);
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            fontFamily: "Segoe UI, Arial, sans-serif"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#fff",
                    padding: "2.5rem 2rem",
                    borderRadius: "1rem",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                    minWidth: 340,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem"
                }}
            >
                <h2 style={{
                    textAlign: "center",
                    margin: 0,
                    color: "#2d3748",
                    fontWeight: 700,
                    letterSpacing: 1
                }}>Sign In</h2>
                <div>
                    <label style={{ fontWeight: 500, color: "#4a5568" }}>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                marginTop: 6,
                                borderRadius: 8,
                                border: "1px solid #cbd5e1",
                                outline: "none",
                                fontSize: 16,
                                marginBottom: 0,
                                transition: "border 0.2s",
                            }}
                            onFocus={e => e.currentTarget.style.border = "1.5px solid #3182ce"}
                            onBlur={e => e.currentTarget.style.border = "1px solid #cbd5e1"}
                            placeholder="you@example.com"
                            autoComplete="username"
                        />
                    </label>
                </div>
                <div>
                    <label style={{ fontWeight: 500, color: "#4a5568" }}>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                marginTop: 6,
                                borderRadius: 8,
                                border: "1px solid #cbd5e1",
                                outline: "none",
                                fontSize: 16,
                                marginBottom: 0,
                                transition: "border 0.2s",
                            }}
                            onFocus={e => e.currentTarget.style.border = "1.5px solid #3182ce"}
                            onBlur={e => e.currentTarget.style.border = "1px solid #cbd5e1"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </label>
                </div>
                {error && (
                    <div style={{
                        color: "#e53e3e",
                        background: "#fff5f5",
                        borderRadius: 6,
                        padding: "0.5rem 1rem",
                        fontSize: 14,
                        textAlign: "center"
                    }}>
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    style={{
                        background: "linear-gradient(90deg, #3182ce 0%, #63b3ed 100%)",
                        color: "#fff",
                        padding: "0.75rem",
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(49, 130, 206, 0.08)",
                        transition: "background 0.2s"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#2563eb"}
                    onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #3182ce 0%, #63b3ed 100%)"}
                >
                    Login
                </button>
            </form>
        </div>
    );
}