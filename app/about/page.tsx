import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Simon",
  description: "Meet Simon Tarrant, Managing Director and Registered D&T Health & Safety Consultant.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero about-hero">
        <div>
          <p className="eyebrow"><span /> About Simon</p>
          <h1>Practical experience, translated into confident practice.</h1>
          <p>Simon Tarrant is Managing Director of Tarrant Engineering and a Registered D&amp;T Health &amp; Safety Consultant.</p>
        </div>
        <div className="about-portrait"><img src="/simon-tarrant.png" alt="Simon Tarrant" /><span>Managing Director<br />Registered D&amp;T H&amp;S Consultant</span></div>
      </section>

      <section className="about-story content-section">
        <div className="story-number">20<span>+</span><small>years in D&amp;T education</small></div>
        <div>
          <h2>Training built around understanding—not box-ticking.</h2>
          <p className="lead">Simon combines technical knowledge with more than two decades of experience in Design &amp; Technology education.</p>
          <p>That means the training is grounded in the way school workshops, food rooms and textiles spaces actually operate. The aim is not simply to complete a course: it is to help teachers and technicians understand safe working practice and feel confident applying it after Simon has left.</p>
          <p>Programmes are planned around the equipment, delegates and certification needs of each school. Where any delegate requires initial training, the school’s programme is classed as initial training. Every proposal is reviewed personally before a quotation is issued.</p>
          <a className="section-link" href="https://www.designtechnology.org.uk/consultant-directory/consultants/simon-tarrant/" target="_blank" rel="noreferrer">Verify Simon on the D&amp;TA consultant directory <span>↗</span></a>
        </div>
      </section>

      <section className="consultancy-section content-section" id="consultancy">
        <div className="section-heading">
          <p className="eyebrow"><span /> Wider consultancy</p>
          <h2>Practical support for secondary D&amp;T departments.</h2>
          <p>Alongside accredited health and safety training, Simon provides focused consultancy for schools developing their curriculum, department, facilities or technical provision.</p>
        </div>
        <div className="consultancy-grid">
          <article>
            <span>01</span>
            <h3>Curriculum &amp; qualifications</h3>
            <p>Planning for GCSE, GCE and technical qualifications, assessment, examination analysis and new specifications.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Department development</h3>
            <p>Subject leadership, CPD, provision reviews, monitoring and evaluation, including preparation for OFSTED or ISI.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Technology &amp; facilities</h3>
            <p>CAD/CAM, product and engineering design, systems, robotics, STEM, specialist materials, equipment and room layouts.</p>
          </article>
          <article>
            <span>04</span>
            <h3>Research &amp; resources</h3>
            <p>Research projects and the development of textbooks, course materials and practical teaching resources.</p>
          </article>
        </div>
        <p className="consultancy-note">Support can be shaped around a specific project or a broader departmental review. <Link href="/contact">Contact Simon to discuss your requirements <span>→</span></Link></p>
      </section>

      <section className="image-triptych">
        <img src="/turning-tool-detail.jpg" alt="Wood-turning tool detail in a school workshop" />
        <img src="/metalwork-detail.jpg" alt="Machined metal components" />
        <img src="/textiles-work.jpg" alt="Colourful textile projects" />
      </section>

      <section className="testimonial-section">
        <blockquote>“Thanks for the training, Simon. Everyone here really enjoyed it and we all feel a lot more confident now.”</blockquote>
        <cite>Bournemouth High School for Girls</cite>
      </section>

      <section className="final-cta">
        <p className="eyebrow light"><span /> Discuss your department</p>
        <h2>Start with a clear picture of what you need.</h2>
        <p>Build a preliminary training plan or contact Simon directly for an initial conversation.</p>
        <div className="hero-actions">
          <Link className="primary-link" href="/quote-builder">Build a training plan <span>→</span></Link>
          <Link className="text-link light-link" href="/contact">Contact Simon</Link>
        </div>
      </section>
    </main>
  );
}
