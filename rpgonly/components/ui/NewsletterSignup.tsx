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
      setMessage("Please enter a valid email address.");
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
        setMessage(data.message ?? "Subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 py-6 text-center"
        style={{ color: "var(--color-accent)" }}
      >
        <span className="text-4xl">✦</span>
        <p className="font-[family-name:var(--font-cinzel)] text-lg">Check your inbox, adventurer!</p>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
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
          <h2
            className="text-2xl mb-2"
            style={{ fontFamily: "var(--font-cinzel)", color: "var(--color-accent)" }}
          >
            The RPG Dispatch
          </h2>
          <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
            Weekly loot for adventurers — guides, deals, and new releases delivered to your inbox.
          </p>
        </>
      ) : (
        <p
          className="text-sm font-[family-name:var(--font-cinzel)] mb-3"
          style={{ color: "var(--color-accent)" }}
        >
          The RPG Dispatch — Weekly loot for adventurers
        </p>
      )}

      <form onSubmit={handleSubmit} className={`flex gap-2 ${isPage ? "max-w-md mx-auto" : ""}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 rounded text-sm outline-none"
          style={{
            backgroundColor: "var(--color-muted)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-jetbrains)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--color-accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 rounded text-sm font-[family-name:var(--font-cinzel)] transition-all disabled:opacity-50"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg)",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "var(--color-accent-hover)")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "var(--color-accent)")
          }
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-2 text-xs" style={{ color: "var(--color-red)" }}>
          {message}
        </p>
      )}
    </div>
  );
}
