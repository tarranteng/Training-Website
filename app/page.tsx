import Link from "next/link";

const courseCards = [
  { code: "SCHS", title: "Secondary core", copy: "Core health and safety training for teachers and technicians.", image: "/workshop-training.jpg" },
  { code: "SMHS", title: "Materials", copy: "Hand tools, portable equipment, processes and workshop machinery.", image: "/metalwork-detail.jpg" },
  { code: "SFHS", title: "Food technology", copy: "Safe working practice in school food rooms and preparation spaces.", image: "/food-technology.jpg" },
  { code: "STHS", title: "Textiles", copy: "Textiles technology training grounded in practical classroom work.", image: "/textiles-work.jpg" },
];

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow"><span /> D&amp;TA accredited training</p>
          <h1>Safer workshops.<br />More confident teams.</h1>
          <p>Practical, hands-on health and safety training for Design &amp; Technology departments across Hampshire and the South of England.</p>
          <div className="hero-actions">
            <Link className="primary-link" href="/quote-builder">Plan your training <span>→</span></Link>
            <Link className="text-link" href="#training-options">Training coverage</Link>
          </div>
        </div>
        <div className="home-hero-image">
          <img src="/workshop-training.jpg" alt="Turned wooden work produced in a Design and Technology workshop" />
          <span className="image-label">Practical training, shaped around your department</span>
        </div>
      </section>

      <section className="trust-strip" aria-label="Professional credentials">
        <div><strong>Senior registered consultant</strong><span>D&amp;T health &amp; safety specialist</span></div>
        <div><strong>D&amp;TA accredited</strong><span>Recognised training and certification</span></div>
        <a href="https://www.designtechnology.org.uk/consultant-directory/consultants/simon-tarrant/" target="_blank" rel="noreferrer"><strong>Independently verifiable</strong><span>View Simon on the D&amp;TA directory ↗</span></a>
      </section>

      <section className="home-courses content-section" id="training-options">
        <div className="section-heading">
          <p className="eyebrow"><span /> Course coverage</p>
          <h2>Training that reflects the reality of school D&amp;T.</h2>
          <p>From core certification to specialist machinery, each programme is practical, relevant and tailored to the equipment your team uses.</p>
        </div>
        <div className="course-card-grid">
          {courseCards.map((course) => (
            <article className="home-course-card" key={course.code}>
              <img src={course.image} alt="" />
              <div><span>{course.code}</span><h3>{course.title}</h3><p>{course.copy}</p></div>
            </article>
          ))}
        </div>
        <Link className="section-link" href="/quote-builder">See the full list and build a training plan <span>→</span></Link>
      </section>

      <section className="planner-promo">
        <div>
          <p className="eyebrow light"><span /> Fewer emails, clearer requirements</p>
          <h2>Build a training plan before you enquire.</h2>
          <p>Select initial or refresher training, identify exactly which delegates need each course and see the estimated number of training days.</p>
          <Link className="primary-link" href="/quote-builder">Open the quote builder <span>→</span></Link>
        </div>
        <div className="planner-preview" aria-hidden="true">
          <span>TRAINING PLAN / LIVE</span>
          <div><strong>SCHS</strong><i>4 delegates</i></div>
          <div><strong>S1HS · Band saw</strong><i>2 delegates</i></div>
          <div><strong>SFHS</strong><i>3 delegates</i></div>
          <b>Estimated training: 2.5 days</b>
        </div>
      </section>

      <section className="about-preview content-section">
        <div className="portrait-frame"><img src="/simon-tarrant.png" alt="Simon Tarrant" /></div>
        <div>
          <p className="eyebrow"><span /> Your consultant</p>
          <h2>Experience in education. Understanding of real workshops.</h2>
          <p className="lead">Simon Tarrant is a Registered D&amp;T Health &amp; Safety Consultant with more than 20 years’ experience in Design &amp; Technology education.</p>
          <p>Training is focused on helping teachers and technicians use equipment confidently, understand their responsibilities and build safer working practice into everyday teaching.</p>
          <p>Simon also supports secondary D&amp;T departments with curriculum and qualifications planning, subject review, CPD, facilities, technical resources and specialist technologies.</p>
          <Link className="section-link" href="/about#consultancy">Meet Simon and explore consultancy support <span>→</span></Link>
        </div>
      </section>

      <section className="testimonial-section">
        <blockquote>“Thanks for the training, Simon. Everyone here really enjoyed it and we all feel a lot more confident now.”</blockquote>
        <cite>Bournemouth High School for Girls</cite>
      </section>

      <section className="final-cta">
        <p className="eyebrow light"><span /> Start with what you know</p>
        <h2>Ready to plan your training?</h2>
        <p>Pricing is based on location, training duration and the number of delegates requiring certification. A tailored estimate is normally provided within 24 hours.</p>
        <div className="hero-actions">
          <Link className="primary-link" href="/quote-builder">Build your plan <span>→</span></Link>
          <Link className="text-link light-link" href="/contact">Contact Simon directly</Link>
        </div>
      </section>
    </main>
  );
}
