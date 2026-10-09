"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  LoaderCircle,
  Check,
  Info,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  inquiryTypes,
  industryOptions,
  sizeOptions,
  leadSchema,
  type LeadInput,
} from "@/lib/lead-schema";

export function LeadForm({
  kind,
  configured,
}: {
  kind: "contact" | "early-access";
  configured: boolean;
}) {
  const early = kind === "early-access";
  const [accepted, setAccepted] = useState(false);
  const [failure, setFailure] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      kind,
      name: "",
      email: "",
      company: "",
      industry: "",
      size: "",
      inquiryType: "",
      message: "",
      contactPreference: "",
      consent: false,
      website: "",
    },
  });
  const error = (field: keyof LeadInput) =>
    errors[field] ? (
      <p className="field-error" id={`${kind}-${field}-error`}>
        {errors[field]?.message}
      </p>
    ) : null;
  const accessibility = (field: keyof LeadInput) => ({
    id: `${kind}-${field}`,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${kind}-${field}-error` : undefined,
  });
  const submit = async (data: LeadInput) => {
    setFailure("");
    if (!configured) {
      setFailure(
        "Submission is not connected yet. Your details have not been submitted. Please return once Polysyne's contact service is available.",
      );
      return;
    }
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true) {
        if (result.fields && typeof result.fields === "object")
          for (const [field, messages] of Object.entries(result.fields)) {
            if (
              Object.hasOwn(data, field) &&
              Array.isArray(messages) &&
              typeof messages[0] === "string"
            )
              setError(field as keyof LeadInput, {
                type: "server",
                message: messages[0],
              });
          }
        setFailure(
          response.status === 429
            ? "You've made several attempts. Please wait a few minutes before trying again."
            : "We couldn't send your details. They have not been confirmed as received. Please try again later.",
        );
        return;
      }
      setAccepted(true);
    } catch {
      setFailure(
        "We couldn't confirm that your request was received. Check your connection and try again later.",
      );
    }
  };
  if (accepted)
    return (
      <div className="lead-form form-success" role="status">
        <span className="success-icon">
          <Check size={28} />
        </span>
        <p className="eyebrow">RECEIVED BY POLYSYNE</p>
        <h2>
          {early
            ? "Your interest is on the list."
            : "A good conversation starts here."}
        </h2>
        <p>
          {early
            ? "Thank you for sharing your business needs. The team can contact you about Opero's development and early-access opportunities."
            : "Thank you for reaching out. Your inquiry has been accepted by our contact service."}
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            reset();
            setAccepted(false);
          }}
        >
          Send another inquiry
        </Button>
      </div>
    );
  return (
    <form
      className="lead-form"
      noValidate
      onSubmit={handleSubmit(submit)}
      aria-label={
        early ? "Opero early access registration" : "Contact Polysyne"
      }
    >
      <div className="form-header">
        <span className="eyebrow">
          {early ? "EARLY ACCESS INTEREST" : "START A CONVERSATION"}
        </span>
        <h2>
          {early
            ? "Your business. Your perspective."
            : "Tell us what's on your mind."}
        </h2>
        <p>
          Fields marked with <span aria-label="an asterisk">*</span> are
          required.
        </p>
      </div>
      {!configured && (
        <div className="form-notice">
          <Info size={17} />
          <p>
            <strong>Form preview</strong>Submission isn&apos;t connected yet.
            Your details cannot be submitted until our contact service is
            available.
          </p>
        </div>
      )}
      <input type="hidden" {...register("kind")} />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${kind}-website`}>Leave this field empty</label>
        <input
          id={`${kind}-website`}
          autoComplete="off"
          tabIndex={-1}
          {...register("website")}
        />
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${kind}-name`}>
            {early ? "Full name" : "Name"} <span>*</span>
          </label>
          <Input
            autoComplete="name"
            placeholder="Alex Morgan"
            maxLength={100}
            required
            {...register("name")}
            {...accessibility("name")}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor={`${kind}-email`}>
            {early ? "Work email" : "Email"} <span>*</span>
          </label>
          <Input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={254}
            required
            {...register("email")}
            {...accessibility("email")}
          />
          {error("email")}
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${kind}-company`}>
          {early ? "Business name" : "Company"}{" "}
          {early ? <span>*</span> : <small>(optional)</small>}
        </label>
        <Input
          autoComplete="organization"
          placeholder="Your business or organization"
          maxLength={150}
          required={early}
          {...register("company")}
          {...accessibility("company")}
        />
        {error("company")}
      </div>
      {early ? (
        <>
          <div className="form-grid">
            <div className="field">
              <label htmlFor={`${kind}-industry`}>
                Industry <span>*</span>
              </label>
              <select
                className="form-control"
                required
                {...register("industry")}
                {...accessibility("industry")}
              >
                <option value="">Select industry</option>
                {industryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {error("industry")}
            </div>
            <div className="field">
              <label htmlFor={`${kind}-size`}>
                Business size <span>*</span>
              </label>
              <select
                className="form-control"
                required
                {...register("size")}
                {...accessibility("size")}
              >
                <option value="">Select size</option>
                {sizeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {error("size")}
            </div>
          </div>
        </>
      ) : (
        <div className="field">
          <label htmlFor={`${kind}-inquiryType`}>
            Inquiry type <span>*</span>
          </label>
          <select
            className="form-control"
            required
            {...register("inquiryType")}
            {...accessibility("inquiryType")}
          >
            <option value="">How can we help?</option>
            {inquiryTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {error("inquiryType")}
        </div>
      )}
      <div className="field">
        <label htmlFor={`${kind}-message`}>
          {early ? "Biggest operational challenge" : "Message"} <span>*</span>
        </label>
        <Textarea
          rows={4}
          placeholder={
            early
              ? "What takes more time or effort than it should?"
              : "A little context goes a long way. Tell us about your idea or inquiry."
          }
          maxLength={3000}
          required
          {...register("message")}
          {...accessibility("message")}
        />
        {error("message")}
      </div>
      {early && (
        <div className="field">
          <label htmlFor={`${kind}-contactPreference`}>
            Contact preference <small>(optional)</small>
          </label>
          <select
            className="form-control"
            {...register("contactPreference")}
            {...accessibility("contactPreference")}
          >
            <option value="">No preference</option>
            <option>Email</option>
            <option>Discuss later</option>
          </select>
          {error("contactPreference")}
        </div>
      )}
      <div className="consent-field">
        <label htmlFor={`${kind}-consent`}>
          <input
            type="checkbox"
            required
            {...register("consent")}
            {...accessibility("consent")}
          />
          <span>
            I agree that Polysyne may use these details to respond to my inquiry
            {early
              ? " and contact me about Opero's development and early access"
              : ""}
            . <span>*</span>
          </span>
        </label>
        {error("consent")}
      </div>
      <details className="privacy-details">
        <summary>How your information is used</summary>
        <p>
          When connected, this form sends your details to Polysyne&apos;s lead
          service for the purpose you selected. Do not include passwords,
          payment details, or sensitive personal information. Use the configured
          company contact channel to request correction or deletion. You can
          decline future communication. No form contents are stored by this
          website&apos;s form handler.
        </p>
      </details>
      {failure && (
        <div className="form-failure" role="alert">
          {failure}
        </div>
      )}
      <Button className="form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="loading-spinner" size={17} /> Sending your
            details…
          </>
        ) : (
          <>
            {early ? "Register my interest" : "Send inquiry"}
            <ArrowUpRight size={17} />
          </>
        )}
      </Button>
      <p className="form-security">
        <ShieldCheck size={13} /> Only submitted to the configured Polysyne
        contact service.
      </p>
    </form>
  );
}
