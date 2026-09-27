"use client";

import { useEffect, type FormEvent, type ReactNode, type RefObject } from "react";
import { FiArrowRight } from "react-icons/fi";
import { EMAIL, PHONE_PRIMARY, PHONE_SECONDARY } from "@/data/social";
import { LiquidSubmit } from "./LiquidSubmit";
import { TickBox } from "./TickBox";
import type { LeadErrors, LeadField, LeadValues, NeedOption } from "./types";
import styles from "./contact.module.css";

interface SheetFormProps {
  labelledBy: string;
  values: LeadValues;
  errors: LeadErrors;
  /** The last send threw: nothing was filed and every value is still on the sheet. */
  sendFailed: boolean;
  options: NeedOption[];
  nameRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  briefRef: RefObject<HTMLTextAreaElement | null>;
  onField: (field: LeadField, value: string) => void;
  /** A field was left: check what can already be checked (a half-typed email), kindly. */
  onLeave: (field: LeadField) => void;
  onNeed: (slug: string, checked: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  /** The control under the visitor's pen (its name), or null when focus leaves the form. */
  onPen: (control: string | null) => void;
}

const labelClass = "font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted";
const inputClass = `${styles.field} block w-full min-w-0 rounded-none border-0 border-b-[1.5px] border-ink/50 bg-transparent px-0 py-2 font-ui text-[21px] leading-[1.35] text-ink caret-accent placeholder:text-ink-muted selection:bg-accent selection:text-fg`;

/**
 * One line of the sheet: a mono label (numbered like the docket line it writes on), the
 * field on a ruled line that draws itself in crimson on focus, then either a quiet hint or,
 * when something needs fixing, the error in its place.
 */
function Field({
  id,
  no,
  label,
  aside,
  hint,
  error,
  children,
}: {
  id: string;
  no: string;
  label: ReactNode;
  aside?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className={`${labelClass} flex items-baseline gap-2.5`}>
          <span aria-hidden="true" className="hidden tabular-nums lg:inline">
            {no}
          </span>
          {label}
        </label>
        {aside ? (
          <span aria-hidden="true" className={`${labelClass} tracking-[0.14em]`}>
            {aside}
          </span>
        ) : null}
      </div>
      <span className={`${styles.line} relative mt-1.5 block`}>
        {children}
        <span aria-hidden="true" className={styles.rule} />
      </span>
      {error ? (
        <p id={`${id}-error`} className={`${styles.error} mt-2 flex gap-2 font-ui text-[14px] leading-snug text-red-600`}>
          <span aria-hidden="true" className="font-mono">
            &times;
          </span>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 font-ui text-[14px] leading-snug text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const linkClass =
  "inline-flex min-h-11 items-center whitespace-nowrap text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/** The top sheet: the fields a visitor fills in. The red office copy mirrors it. */
export function SheetForm({
  labelledBy,
  values,
  errors,
  sendFailed,
  options,
  nameRef,
  emailRef,
  briefRef,
  onField,
  onLeave,
  onNeed,
  onSubmit,
  onPen,
}: SheetFormProps) {
  // field-sizing: content grows the brief natively; older engines get a height fallback.
  useEffect(() => {
    const el = briefRef.current;
    if (!el || (typeof CSS !== "undefined" && CSS.supports("field-sizing", "content"))) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [values.brief, briefRef]);

  // The error replaces the hint, so the field is described by whichever one is showing.
  const described = (field: keyof LeadErrors, id: string, hasHint: boolean) =>
    errors[field]
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` }
      : hasHint
        ? { "aria-describedby": `${id}-hint` }
        : {};

  return (
    <form
      noValidate
      aria-labelledby={labelledBy}
      onSubmit={onSubmit}
      onFocus={(e) => onPen(e.target instanceof HTMLElement ? e.target.getAttribute("name") : null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onPen(null);
      }}
      className="flex flex-col gap-8 lg:gap-7"
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 lg:gap-y-7">
        <Field id="lead-name" no="02" label="Name" error={errors.name}>
          <input
            ref={nameRef}
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => onField("name", e.target.value)}
            onBlur={() => onLeave("name")}
            className={inputClass}
            {...described("name", "lead-name", false)}
          />
        </Field>
        <Field id="lead-email" no="03" label="Email" hint="Where we write back." error={errors.email}>
          <input
            ref={emailRef}
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            required
            value={values.email}
            onChange={(e) => onField("email", e.target.value)}
            onBlur={() => onLeave("email")}
            className={inputClass}
            {...described("email", "lead-email", true)}
          />
        </Field>
      </div>

      <Field id="lead-phone" no="04" label={
          <>
            Phone or WhatsApp<span className="sr-only"> (optional)</span>
          </>
        }
        aside="Optional" hint="Only if you would rather talk than type.">
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(e) => onField("phone", e.target.value)}
          aria-describedby="lead-phone-hint"
          className={inputClass}
        />
      </Field>

      <fieldset className="min-w-0">
        <legend className={`${labelClass} flex w-full items-baseline justify-between gap-4`}>
          <span className="flex items-baseline gap-2.5">
            <span aria-hidden="true" className="hidden tabular-nums lg:inline">
              05
            </span>
            What do you need?
          </span>
          <span aria-hidden="true" className="tracking-[0.14em]">
            Tick any
          </span>
        </legend>
        <div className="mt-2 grid gap-x-10 sm:grid-cols-2">
          {options.map((option) => (
            <TickBox
              key={option.slug}
              name="needs"
              value={option.slug}
              label={option.label}
              checked={values.needs.includes(option.slug)}
              onChange={onNeed}
            />
          ))}
        </div>
      </fieldset>

      <Field
        id="lead-brief"
        no="06"
        label="Brief"
        hint="A few lines is plenty. Timing or budget helps, if you know them."
        error={errors.brief}
      >
        <textarea
          ref={briefRef}
          id="lead-brief"
          name="brief"
          rows={4}
          required
          placeholder="What are you building, and where is it stuck?"
          value={values.brief}
          onChange={(e) => onField("brief", e.target.value)}
          className={`${inputClass} ${styles.brief}`}
          {...described("brief", "lead-brief", true)}
        />
      </Field>

      <div className="flex flex-col gap-4">
        <LiquidSubmit
          fillClassName="bg-ink"
          className={`${styles.send} flex h-16 w-full items-center justify-center rounded-full bg-accent px-8 font-ui text-[13px] font-semibold uppercase tracking-[0.18em] text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`}
        >
          <span>Tear off and send</span>
          <FiArrowRight aria-hidden="true" className="size-[18px] transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
        </LiquidSubmit>

        {sendFailed ? (
          <p role="alert" className="font-ui text-[15px] leading-snug text-red-600 [text-wrap:pretty]">
            That did not go through. Nothing on the sheet was lost, so you can send it again or use a line below.
          </p>
        ) : null}

        {/* Wraps as whole items, so no separator is ever stranded at the start of a line.
            Each link is a full 44px touch target; the row keeps its type size. */}
        <p className="-mt-2 flex flex-wrap items-center gap-x-4 font-ui text-[15px] leading-relaxed text-ink-muted">
          <span>Or skip the form:</span>
          <a href={PHONE_PRIMARY.href} className={linkClass}>
            {PHONE_PRIMARY.display}
          </a>
          <a href={PHONE_SECONDARY.href} className={linkClass}>
            {PHONE_SECONDARY.display}
          </a>
          <a href={`mailto:${EMAIL}`} className={linkClass}>
            {EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
