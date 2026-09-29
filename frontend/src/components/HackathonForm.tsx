"use client";

import { useState, type FormEvent } from "react";
import { submitHackathonRegistration, ApiError } from "@/lib/api";

type Member = { fullName: string; email: string; institution: string };

type FormState = {
  teamName: string;
  attendanceMode: "in-person" | "online";
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderInstitution: string;
  members: Member[];
  githubUrl: string;
  agreedToRules: boolean;
  hpField: string;
};

const emptyMember: Member = { fullName: "", email: "", institution: "" };

const initialState: FormState = {
  teamName: "",
  attendanceMode: "in-person",
  leaderName: "",
  leaderEmail: "",
  leaderPhone: "",
  leaderInstitution: "",
  members: [],
  githubUrl: "",
  agreedToRules: false,
  hpField: "",
};

type Errors = Record<string, string>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.teamName.trim().length < 2) errors.teamName = "Give your team a name.";
  if (form.leaderName.trim().length < 2) errors.leaderName = "Enter the team leader's name.";
  if (!/^\S+@\S+\.\S+$/.test(form.leaderEmail)) errors.leaderEmail = "Enter a valid email address.";
  if (!/^[0-9+\-\s]{7,15}$/.test(form.leaderPhone)) errors.leaderPhone = "Enter a valid phone number.";
  if (form.leaderInstitution.trim().length < 2) errors.leaderInstitution = "Enter the leader's institution.";
  if (!form.agreedToRules) errors.agreedToRules = "You must accept the hackathon rules to register.";
  form.members.forEach((m, i) => {
    if (m.fullName.trim().length < 2) errors[`member-${i}-name`] = "Enter this member's name.";
    if (!/^\S+@\S+\.\S+$/.test(m.email)) errors[`member-${i}-email`] = "Enter a valid email.";
  });
  return errors;
}

export default function HackathonForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateMember(index: number, patch: Partial<Member>) {
    setForm((f) => ({
      ...f,
      members: f.members.map((m, i) => (i === index ? { ...m, ...patch } : m)),
    }));
  }

  function addMember() {
    if (form.members.length >= 3) return;
    setForm((f) => ({ ...f, members: [...f.members, { ...emptyMember }] }));
  }

  function removeMember(index: number) {
    setForm((f) => ({ ...f, members: f.members.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    setServerError(null);
    try {
      await submitHackathonRegistration({
        teamName: form.teamName.trim(),
        track: "General",
        attendanceMode: form.attendanceMode,
        leader: {
          fullName: form.leaderName.trim(),
          email: form.leaderEmail.trim(),
          phone: form.leaderPhone.trim(),
          institution: form.leaderInstitution.trim(),
        },
        members: form.members.map((m) => ({
          fullName: m.fullName.trim(),
          email: m.email.trim(),
          institution: m.institution.trim(),
        })),
        githubUrl: form.githubUrl.trim() || undefined,
        agreedToRules: form.agreedToRules,
        hpField: form.hpField,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof ApiError ? err.message : "Couldn't reach the server. Try again shortly.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-10 text-center">
        <p className="font-mono text-xs text-bloom-400">TEAM REGISTERED</p>
        <h2 className="mt-4 font-display text-3xl text-mist-100">
          &ldquo;{form.teamName}&rdquo; is in.
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-mist-500">
          We&rsquo;ve saved your team. Problem statements and rules will be shared with the team
          leader before the event. See you at kickoff.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card relative space-y-10 p-6 sm:p-10">
      <fieldset className="space-y-6">
        <legend className="font-display text-xl text-mist-100">Team</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="teamName" className="field-label">Team name</label>
            <input
              id="teamName"
              className="field-input"
              value={form.teamName}
              onChange={(e) => update("teamName", e.target.value)}
              placeholder="Superposition Squad"
            />
            {errors.teamName && <p className="field-error">{errors.teamName}</p>}
          </div>

          <div>
            <label htmlFor="attendanceMode" className="field-label">How will you attend?</label>
            <select
              id="attendanceMode"
              className="field-input"
              value={form.attendanceMode}
              onChange={(e) => update("attendanceMode", e.target.value as FormState["attendanceMode"])}
            >
              <option value="in-person">In person, at IIT Indore</option>
              <option value="online">Fully remote</option>
            </select>
          </div>

          <div>
            <label htmlFor="githubUrl" className="field-label">
              GitHub / team profile <span className="text-mist-500">(optional)</span>
            </label>
            <input
              id="githubUrl"
              className="field-input"
              value={form.githubUrl}
              onChange={(e) => update("githubUrl", e.target.value)}
              placeholder="https://github.com/your-team"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-6 border-t border-mist-300/10 pt-8">
        <legend className="font-display text-xl text-mist-100">Team leader</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="leaderName" className="field-label">Full name</label>
            <input
              id="leaderName"
              className="field-input"
              value={form.leaderName}
              onChange={(e) => update("leaderName", e.target.value)}
            />
            {errors.leaderName && <p className="field-error">{errors.leaderName}</p>}
          </div>
          <div>
            <label htmlFor="leaderEmail" className="field-label">Email</label>
            <input
              id="leaderEmail"
              type="email"
              className="field-input"
              value={form.leaderEmail}
              onChange={(e) => update("leaderEmail", e.target.value)}
            />
            {errors.leaderEmail && <p className="field-error">{errors.leaderEmail}</p>}
          </div>
          <div>
            <label htmlFor="leaderPhone" className="field-label">Phone number</label>
            <input
              id="leaderPhone"
              type="tel"
              className="field-input"
              value={form.leaderPhone}
              onChange={(e) => update("leaderPhone", e.target.value)}
            />
            {errors.leaderPhone && <p className="field-error">{errors.leaderPhone}</p>}
          </div>
          <div>
            <label htmlFor="leaderInstitution" className="field-label">College / organization</label>
            <input
              id="leaderInstitution"
              className="field-input"
              value={form.leaderInstitution}
              onChange={(e) => update("leaderInstitution", e.target.value)}
            />
            {errors.leaderInstitution && <p className="field-error">{errors.leaderInstitution}</p>}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-6 border-t border-mist-300/10 pt-8">
        <div className="flex items-center justify-between">
          <legend className="font-display text-xl text-mist-100">
            Teammates <span className="text-sm font-normal text-mist-500">(up to 3 more)</span>
          </legend>
          {form.members.length < 3 && (
            <button type="button" onClick={addMember} className="btn-secondary !px-4 !py-2 text-xs">
              + Add teammate
            </button>
          )}
        </div>

        {form.members.length === 0 && (
          <p className="text-sm text-mist-500">
            Registering solo is fine — we&rsquo;ll help you find teammates at kickoff.
          </p>
        )}

        <div className="space-y-6">
          {form.members.map((member, i) => (
            <div key={i} className="rounded-xl border border-mist-300/10 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-xs text-mist-500">TEAMMATE {i + 1}</p>
                <button
                  type="button"
                  onClick={() => removeMember(i)}
                  className="text-xs text-mist-500 hover:text-bloom-400"
                >
                  Remove
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="field-label">Full name</label>
                  <input
                    className="field-input"
                    value={member.fullName}
                    onChange={(e) => updateMember(i, { fullName: e.target.value })}
                  />
                  {errors[`member-${i}-name`] && <p className="field-error">{errors[`member-${i}-name`]}</p>}
                </div>
                <div>
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    className="field-input"
                    value={member.email}
                    onChange={(e) => updateMember(i, { email: e.target.value })}
                  />
                  {errors[`member-${i}-email`] && <p className="field-error">{errors[`member-${i}-email`]}</p>}
                </div>
                <div>
                  <label className="field-label">Institution</label>
                  <input
                    className="field-input"
                    value={member.institution}
                    onChange={(e) => updateMember(i, { institution: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 border-t border-mist-300/10 pt-8">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-mist-300/30 bg-ink-900 accent-bloom-500"
          checked={form.agreedToRules}
          onChange={(e) => update("agreedToRules", e.target.checked)}
        />
        <span className="text-sm text-mist-300">
          We&rsquo;ve read the hackathon rules and agree to build our submission during the event
          window.
        </span>
      </label>
      {errors.agreedToRules && <p className="field-error">{errors.agreedToRules}</p>}

      {/* Honeypot: hidden from people, but bots fill it in. Must stay empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="hpField">Leave this field empty</label>
        <input
          id="hpField"
          name="hpField"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.hpField}
          onChange={(e) => update("hpField", e.target.value)}
        />
      </div>

      {serverError && (
        <p className="rounded-lg border border-bloom-500/30 bg-bloom-500/10 px-4 py-3 text-sm text-bloom-400">
          {serverError}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? "Submitting..." : "Register team"}
      </button>
    </form>
  );
}
