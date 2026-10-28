import React, { useState } from 'react';
import {
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ServerOff,
  Copy,
  Check,
  MessageSquare,
  GitPullRequest
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const configuredEndpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim();
  const isBackendConfigured = Boolean(configuredEndpoint && configuredEndpoint.startsWith('http'));

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'
  >('idle');
  const [statusFeedback, setStatusFeedback] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState(false);

  const validate = (input: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!input.name.trim() || input.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim() || !emailRegex.test(input.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!input.subject.trim() || input.subject.trim().length < 3) {
      nextErrors.subject = 'Please enter a subject (at least 3 characters).';
    }
    if (!input.message.trim() || input.message.trim().length < 10) {
      nextErrors.message = 'Please enter a message (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitState !== 'idle') {
      setSubmitState('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState('error');
      setStatusFeedback('Please resolve the highlighted validation errors before submitting.');
      return;
    }

    setErrors({});

    if (!isBackendConfigured || !configuredEndpoint) {
      setSubmitState('unconfigured');
      setStatusFeedback(
        'The contact form requires backend configuration (VITE_CONTACT_ENDPOINT) before it can send messages. Your form input was validated locally, but no message has been transmitted.'
      );
      return;
    }

    setSubmitState('submitting');
    try {
      const response = await fetch(configuredEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      setSubmitState('success');
      setStatusFeedback('Your message has been sent successfully.');
      setValues({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitState('error');
      setStatusFeedback(
        'Unable to transmit message to the configured backend endpoint. Please try again later or reach out via GitHub.'
      );
    }
  };

  const handleCopyFormatted = async () => {
    const formatted = `Name: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <>
      <SEOHead
        title="Contact — AppNexa"
        description="Get in touch regarding AppNexa applications, bug reports, or platform feedback."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="pb-8 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D28] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[#35D9F5] mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Support &amp; Inquiries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[#F5F7FA]">
              Contact AppNexa
            </h1>
            <p className="text-sm sm:text-base text-[#A5B0C0] mt-2 max-w-2xl">
              Have feedback on an application, found a release issue, or want to get in touch with
              the developer? Use the form below or connect directly on GitHub.
            </p>
          </div>

          {!isBackendConfigured && (
            <div
              role="note"
              className="p-4 sm:p-5 rounded-2xl bg-[#151D28] border border-[#8B7CFF]/40 flex items-start gap-3.5"
            >
              <ServerOff className="w-5 h-5 text-[#8B7CFF] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <h2 className="font-heading font-semibold text-[#F5F7FA]">
                  Backend Mail Service Not Configured
                </h2>
                <p className="text-[#A5B0C0] leading-relaxed">
                  This static deployment does not currently have a backend mail endpoint configured
                  (<code className="font-mono text-xs text-[#35D9F5]">VITE_CONTACT_ENDPOINT</code>).
                  The contact form below requires backend configuration before it can send messages.
                  For immediate communication or issue reporting, please use the GitHub link provided.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => void handleSubmit(e)}
              noValidate
              className="lg:col-span-7 rounded-2xl bg-[#151D28] border border-white/[0.08] p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h2 className="text-lg font-heading font-semibold text-[#F5F7FA]">
                  Send a Message
                </h2>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#0B0F14] border border-white/10 text-[#A5B0C0]">
                  {isBackendConfigured ? 'Endpoint Ready' : 'Requires Backend Config'}
                </span>
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-1.5"
                >
                  Name <span className="text-[#35D9F5]">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F14] border text-sm text-[#F5F7FA] placeholder-[#A5B0C0]/60 focus:outline-none transition-colors ${
                    errors.name
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-white/10 focus:border-[#35D9F5]'
                  }`}
                />
                {errors.name && (
                  <p id="error-name" className="text-xs text-rose-400 mt-1.5">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-1.5"
                >
                  Email Address <span className="text-[#35D9F5]">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F14] border text-sm text-[#F5F7FA] placeholder-[#A5B0C0]/60 focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-white/10 focus:border-[#35D9F5]'
                  }`}
                />
                {errors.email && (
                  <p id="error-email" className="text-xs text-rose-400 mt-1.5">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-1.5"
                >
                  Subject <span className="text-[#35D9F5]">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={handleChange}
                  placeholder="Application feedback, bug report, or general question"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F14] border text-sm text-[#F5F7FA] placeholder-[#A5B0C0]/60 focus:outline-none transition-colors ${
                    errors.subject
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-white/10 focus:border-[#35D9F5]'
                  }`}
                />
                {errors.subject && (
                  <p id="error-subject" className="text-xs text-rose-400 mt-1.5">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-[#F5F7FA] mb-1.5"
                >
                  Message <span className="text-[#35D9F5]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#0B0F14] border text-sm text-[#F5F7FA] placeholder-[#A5B0C0]/60 focus:outline-none transition-colors resize-y ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-white/10 focus:border-[#35D9F5]'
                  }`}
                />
                {errors.message && (
                  <p id="error-message" className="text-xs text-rose-400 mt-1.5">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitState === 'success' && (
                <div
                  role="status"
                  className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs sm:text-sm text-emerald-300"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{statusFeedback}</span>
                </div>
              )}

              {submitState === 'error' && (
                <div
                  role="alert"
                  className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs sm:text-sm text-rose-300"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{statusFeedback}</span>
                </div>
              )}

              {submitState === 'unconfigured' && (
                <div
                  role="alert"
                  className="p-4 rounded-lg bg-[#111821] border border-[#8B7CFF]/50 space-y-3"
                >
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F7FA]">
                    <ServerOff className="w-4 h-4 text-[#8B7CFF] shrink-0 mt-0.5" />
                    <span>{statusFeedback}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 pl-6">
                    <button
                      type="button"
                      onClick={() => void handleCopyFormatted()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151D28] border border-white/10 hover:border-[#35D9F5]/50 text-xs font-mono text-[#35D9F5]"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied Draft to Clipboard
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Validated Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#35D9F5] hover:bg-[#5ce3fa] text-[#0B0F14] font-semibold text-sm transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {submitState === 'submitting' ? 'Sending Message...' : 'Validate & Submit Message'}
                </span>
              </button>
            </form>

            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-2xl bg-[#151D28] border border-white/[0.08] p-6 space-y-4">
                <h2 className="text-base font-heading font-semibold text-[#F5F7FA]">
                  Connect on GitHub
                </h2>
                <p className="text-xs sm:text-sm text-[#A5B0C0] leading-relaxed">
                  You can view source repositories, inspect published releases, or follow upcoming
                  software projects on the developer&apos;s official GitHub profile.
                </p>

                <a
                  href="https://github.com/skakshay007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#111821] hover:bg-[#0B0F14] border border-white/10 hover:border-[#35D9F5]/50 text-xs sm:text-sm font-mono text-[#F5F7FA] transition-colors"
                >
                  <span>https://github.com/skakshay007</span>
                  <ExternalLink className="w-4 h-4 text-[#35D9F5] shrink-0" />
                </a>
              </div>

              <div className="rounded-2xl bg-[#151D28] border border-white/[0.08] p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-[#8B7CFF]">
                  <GitPullRequest className="w-4 h-4" />
                  <h3 className="text-sm font-heading font-semibold text-[#F5F7FA]">
                    Application Bug Reports
                  </h3>
                </div>
                <p className="text-xs text-[#A5B0C0] leading-relaxed">
                  For technical issues or feature requests related to Universal Music Sleep Timer,
                  opening an issue directly on the application&apos;s GitHub repository is the
                  fastest way to track resolution.
                </p>
                <a
                  href="https://github.com/skakshay007/Universal-Music-Sleep-Timer/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#35D9F5] hover:underline"
                >
                  <span>Open Repository Issues</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
