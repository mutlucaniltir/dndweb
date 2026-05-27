"use client";

import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

interface NewsletterSignupProps {
  variant?: "inline" | "page";
}

export function NewsletterSignup({ variant = "inline" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage("INVALID EMAIL ADDRESS.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { success: boolean; message?: string; error?: string };
      if (data.success) {
        setStatus("success");
        setMessage(data.message ?? "SUBSCRIBED!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "SOMETHING WENT WRONG.");
      }
    } catch {
      setStatus("error");
      setMessage("NETWORK ERROR. TRY AGAIN.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "1.5rem",
            color: "var(--color-accent)",
          }}
        >
          ✦
        </div>
        <p
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.55rem",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
          }}
        >
          QUEST ACCEPTED!
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "var(--color-text-secondary)",
          }}
        >
          {message}
        </p>
      </div>
    );
  }

  const isPage = variant === "page";

  return (
    <div className={isPage ? "text-center" : ""}>
      {isPage ? (
        <>
          <div
            className="inline-block mb-3 px-3 py-1"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "0.4rem",
              color: "var(--color-accent)",
              border: "1px solid var(--color-border)",
              letterSpacing: "0.2em",
            }}
          >
            ▸ FREE SUBSCRIPTION ◂
          </div>
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-press-start)",
              fontSize: "clamp(0.7rem, 2vw, 1rem)",
              color: "var(--color-text-primary)",
              lineHeight: 1.6,
            }}
          >
            THE RPG DISPATCH
          </h2>
          <p
            className="mb-6 mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              color: "var(--color-text-secondary)",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            Weekly loot for adventurers — guides, deals, and new releases delivered to your inbox.
          </p>
        </>
      ) : (
        <p
          className="mb-4"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.48rem",
            color: "var(--color-accent)",
            letterSpacing: "0.08em",
            lineHeight: 1.8,
          }}
        >
          ▸ THE RPG DISPATCH — WEEKLY LOOT FOR ADVENTURERS
        </p>
      )}

      <form onSubmit={handleSubmit} className={`flex gap-2 ${isPage ? "max-w-md mx-auto" : ""}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER@EMAIL.COM"
          required
          className="flex-1 px-4 py-2.5 outline-none"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-press-start)",
            fontSize: "0.42rem",
            letterSpacing: "0.05em",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-pixel-solid disabled:opacity-50"
          style={{ whiteSpace: "nowrap" }}
        >
          {status === "loading" ? "..." : "▶ JOIN"}
        </button>
      </form>

      {status === "error" && (
        <p
          className="mt-2"
          style={{
            fontFamily: "var(--font-press-start)",
            fontSize: "0.38rem",
            color: "var(--color-red)",
            letterSpacing: "0.05em",
          }}
        >
          ✕ {message}
        </p>
      )}
    </div>
  );
}
