import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Simon Tarrant about D&TA accredited Design and Technology health and safety training.",
};

const faqs = [
  ["Where do you provide training?", "Tarrant Engineering serves schools across Hampshire, Dorset, Wiltshire, Berkshire, Surrey and West Sussex. Other locations may be available by arrangement."],
  ["How is pricing calculated?", "Prices start from £400 per day for on-site training. Final pricing reflects location, the number of training days and the number of delegates requiring D&TA certification. A tailored estimate is provided after your requirements are reviewed."],
  ["Can initial and refresher courses be combined?", "If someone needs initial training on any item, all of that delegate’s training will normally be treated as initial; otherwise D&TA charges two certification fees (£60 rather than £30). Unless initial and refresher delegates can be clearly separated, the school’s booking will therefore be treated as initial training. If some staff need refresher training and others need initial training, with no overlap, please submit two quote-builder plans, one for initial training and one for refresher training, and Simon will combine them into a practical schedule. Use the additional information box to explain relevant prior experience or training."],
  ["What information should I provide?", "Your organisation and postcode, total unique delegates, the courses each delegate group requires and your available working-day hours are the most useful starting points."],
];

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero contact-hero">
        <div>
          <p className="eyebrow"><span /> Contact Tarrant Engineering</p>
          <h1>Straightforward conversations start here.</h1>
          <p>If you already know the courses and delegates involved, the quote builder is the quickest route to a detailed estimate.</p>
          <Link className="primary-link" href="/quote-builder">Open the quote builder <span>→</span></Link>
        </div>
        <div className="contact-card">
          <span>DIRECT CONTACT</span>
          <h2>Simon Tarrant</h2>
          <p>Managing Director<br />Registered D&amp;T H&amp;S Consultant</p>
          <a href="mailto:simon@tarranteng.co.uk">simon@tarranteng.co.uk</a>
          <p>Simon is usually teaching or delivering training during office hours but can arrange a phone call via email if you'd like to talk over the phone</p>
          <small>Enquiries are normally acknowledged within one working day.</small>
        </div>
      </section>

      <section className="faq-section content-section" id="faqs">
        <div className="section-heading">
          <p className="eyebrow"><span /> Before you enquire</p>
          <h2>Useful answers</h2>
        </div>
        <div className="faq-grid">
          {faqs.map(([question, answer], index) => (
            <article key={question}><span>{String(index + 1).padStart(2, "0")}</span><h3>{question}</h3><p>{answer}</p></article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow light"><span /> Prefer email?</p>
        <h2>Tell Simon what your department needs.</h2>
        <p>Include your school, postcode, likely delegate numbers and any courses you already know are required.</p>
        <a className="primary-link" href="mailto:simon@tarranteng.co.uk?subject=D%26TA%20training%20enquiry">Email Simon <span>→</span></a>
      </section>
    </main>
  );
}
