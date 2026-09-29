"use client";

import { useState, type FormEvent } from "react";
import { submitRegistration, ApiError } from "@/lib/api";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  yearOfStudy: string;
  attendanceMode: "in-person" | "online" | "both";
  experienceLevel: "beginner" | "intermediate" | "advanced";
  interests: string[];
  hearAboutUs: string;
  hpField: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  institution: "",
  yearOfStudy: "",
  attendanceMode: "in-person",
  experienceLevel: "beginner",
  interests: [],
  hearAboutUs: "",
  hpField: "",
};

const interestOptions = [
  "Quantum algorithms",
  "Quantum machine learning",
  "Quantum finance",
  "Post-quantum cryptography",
  "Hardware & devices",
  "Just exploring",
];

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) errors.phone = "Enter a valid phone number.";
  if (form.institution.trim().length < 2) errors.institution = "Enter your college or organization.";
  if (!form.yearOfStudy.trim()) errors.yearOfStudy = "Tell us your year of study or role.";
  return errors;
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleInterest(interest: string) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    setServerError(null);
    try {
      await submitRegistration({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        institution: form.institution.trim(),
        yearOfStudy: form.yearOfStudy.trim(),
        attendanceMode: form.attendanceMode,
        experienceLevel: form.experienceLevel,
        interests: form.interests,
        hearAboutUs: form.hearAboutUs.trim() || undefined,
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
        <p className="font-mono text-xs text-bloom-400">REGISTRATION CONFIRMED</p>
        <h2 className="mt-4 font-display text-3xl text-mist-100">You&rsquo;re on the list.</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-mist-500">
          We&rsquo;ve saved your spot for Qiskit Fall Fest 2026. Keep an eye on your inbox and our
          socials for event updates closer to the date.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card relative space-y-8 p-6 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="field-label">Full name</label>
          <input
            id="fullName"
            className="field-input"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Ada Lovelace"
            autoComplete="name"
          />
          {errors.fullName && <p className="field-error">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input
            id="email"
            type="email"
            className="field-input"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">Phone number</label>
          <input
            id="phone"
            type="tel"
            className="field-input"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
          {errors.phone && <p className="field-error">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="institution" className="field-label">College / organization</label>
          <input
            id="institution"
            className="field-input"
            value={form.institution}
            onChange={(e) => update("institution", e.target.value)}
            placeholder="IIT Indore"
          />
          {errors.institution && <p className="field-error">{errors.institution}</p>}
        </div>

        <div>
          <label htmlFor="yearOfStudy" className="field-label">Year of study / role</label>
          <input
            id="yearOfStudy"
            className="field-input"
            value={form.yearOfStudy}
            onChange={(e) => update("yearOfStudy", e.target.value)}
            placeholder="2nd year undergrad"
          />
          {errors.yearOfStudy && <p className="field-error">{errors.yearOfStudy}</p>}
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
            <option value="online">Online</option>
            <option value="both">Both (online + in person)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="field-label">Experience with quantum computing</label>
        <div className="flex flex-wrap gap-3">
          {(["beginner", "intermediate", "advanced"] as const).map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => update("experienceLevel", level)}
              className={`rounded-full border px-4 py-2 text-sm capitalize transition-colors ${
                form.experienceLevel === level
                  ? "border-bloom-500 bg-bloom-500/15 text-bloom-400"
                  : "border-mist-300/20 text-mist-300 hover:border-mist-300/50"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="field-label">What are you most interested in?</label>
        <div className="flex flex-wrap gap-2.5">
          {interestOptions.map((interest) => {
            const selected = form.interests.includes(interest);
            return (
              <button
                type="button"
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected
                    ? "border-violet-400 bg-violet-400/15 text-violet-400"
                    : "border-mist-300/20 text-mist-300 hover:border-mist-300/50"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="hearAboutUs" className="field-label">
          How did you hear about Fall Fest? <span className="text-mist-500">(optional)</span>
        </label>
        <input
          id="hearAboutUs"
          className="field-input"
          value={form.hearAboutUs}
          onChange={(e) => update("hearAboutUs", e.target.value)}
          placeholder="Instagram, a friend, club email..."
        />
      </div>

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
        {status === "submitting" ? "Submitting..." : "Confirm registration"}
      </button>
    </form>
  );
}
