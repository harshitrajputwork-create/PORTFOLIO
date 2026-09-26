"use client";

import { useRef, useState } from "react";

// Sends the form to Harshit's inbox through FormSubmit (no backend needed).
// The very first submission triggers a one-time activation email to the inbox;
// after clicking "Activate" there, every submission arrives as a normal email.
const ENDPOINT = "https://formsubmit.co/ajax/harshitrajputwork@gmail.com";
const EMAIL = "harshitrajputwork@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

export default function HireMe({ label = "Work with me", className = "btn bg-yellow" }: { label?: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const open = () => {
    setStatus("idle");
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // bot
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Portfolio: ${data.reason} from ${data.company || data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === "false" || json.success === false) throw new Error("send failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button type="button" className={className} onClick={open}>
        {label}
      </button>
      <dialog ref={dialog} className="hire" aria-labelledby="hire-title" onClick={(e) => e.target === dialog.current && close()}>
        <div className="hire-inner">
          <button type="button" className="hire-x" onClick={close} aria-label="Close">×</button>
          {status === "sent" ? (
            <div className="hire-done">
              <h3 id="hire-title">Sent. Thank you!</h3>
              <p>It&apos;s in my inbox. I usually reply within a day, and I&apos;ll call if you left a number.</p>
              <button type="button" className="btn bg-yellow" onClick={close}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 id="hire-title">Let&apos;s work together</h3>
              <p className="hire-sub">Hiring for a PM role, or need product help on a project? Tell me a little and it comes straight to my inbox.</p>

              <label htmlFor="hire-reason">What are you looking for?</label>
              <select id="hire-reason" name="reason" required defaultValue="Full-time PM role">
                <option>Full-time PM role</option>
                <option>Freelance product project</option>
                <option>Product advice or a quick consult</option>
                <option>Something else</option>
              </select>

              <div className="hire-row">
                <div>
                  <label htmlFor="hire-name">Your name</label>
                  <input id="hire-name" name="name" required autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="hire-company">Company</label>
                  <input id="hire-company" name="company" autoComplete="organization" placeholder="Optional" />
                </div>
              </div>

              <div className="hire-row">
                <div>
                  <label htmlFor="hire-email">Work email</label>
                  <input id="hire-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="hire-phone">Phone, for a call back</label>
                  <input id="hire-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
                </div>
              </div>

              <label htmlFor="hire-msg">A line about the role or project</label>
              <textarea id="hire-msg" name="message" rows={3} placeholder="Optional: team, problem, timeline, or a job link" />

              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hire-honey" aria-hidden="true" />

              {status === "error" && (
                <p className="hire-err">That didn&apos;t send. Please email me directly at <b className="mono">{EMAIL}</b>.</p>
              )}
              <button type="submit" className="btn bg-pink hire-send" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send to Harshit →"}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
