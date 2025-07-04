"use client";

import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/hyadav067@hotmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="contact"
        className="w-full min-h-[80vh] px-8 md:px-10 py-32 flex items-center justify-center scroll-mt-28 transition-colors duration-300"
      >
        <div className="text-center space-y-4 max-w-md">
          <svg
            width="70"
            height="70"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="text-green-600 mx-auto sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px]"
          >
            <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10m0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8"></path>
            <path d="M10 16c-.26 0-.51-.1-.71-.29l-3-3L7.7 11.3l2.29 2.29 5.29-5.29 1.41 1.41-6 6c-.2.2-.45.29-.71.29Z"></path>
          </svg>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--portfolio-text-color)]">
            Thank You!
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-light)]">
            Thanks for your email! I'm quick to respond because your messages
            matter. Let's keep the conversation going.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="w-full scroll-mt-28 px-4 md:px-10 py-16 sm:py-20 md:py-24 lg:py-48 transition-colors duration-300"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--portfolio-text-color)]">
          <span>Get in </span>
          <span className="text-[var(--main-color)] border-b-4 border-[var(--main-color)]">
            Touch
          </span>
        </h1>
        <p className="mt-5 text-lg max-w-xl mx-auto text-[var(--text-light)]">
          Have a question or want to work together? Drop me a message!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="bg-[var(--text-lightt)] text-[var(--portfolio-text-color)] border border-[var(--main-color)] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-colors duration-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="bg-[var(--text-lightt)] text-[var(--portfolio-text-color)] border border-[var(--main-color)] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-colors duration-300"
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="bg-[var(--text-lightt)] text-[var(--portfolio-text-color)] border border-[var(--main-color)] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] transition-colors duration-300"
        />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <button
          type="submit"
          className={`bg-[var(--main-color)] text-[var(--text-lightt)] font-semibold py-3 px-6 rounded-md hover:scale-105 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
