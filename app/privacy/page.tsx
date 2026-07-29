import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main>
      <section className="legal-page content-section">
        <p className="eyebrow"><span /> Privacy notice</p>
        <h1>How enquiry information is used</h1>
        <p className="lead">Tarrant Engineering Ltd uses the information you provide to respond to training enquiries, prepare estimates and arrange services.</p>
        <h2>Information collected</h2>
        <p>Enquiry forms may collect your name, work email address, telephone number, school or organisation, address, postcode, course requirements and delegate numbers.</p>
        <h2>Purpose and retention</h2>
        <p>Information is used only to assess your requirements, communicate with you and maintain appropriate business records. It is retained only for as long as reasonably necessary for those purposes and any applicable legal or accounting obligations.</p>
        <h2>Service providers</h2>
        <p>Quote requests are processed by Web3Forms, the form-delivery provider used by this website. Information is not sold or used for unrelated marketing.</p>
        <h2>Your choices</h2>
        <p>You may ask what personal information is held about you, request a correction or ask for information to be deleted where there is no continuing legal or business need to retain it.</p>
        <h2>Contact</h2>
        <p>For privacy questions, email <a href="mailto:simon@tarranteng.co.uk">simon@tarranteng.co.uk</a>.</p>
        <p className="legal-note">This notice should be reviewed before the public launch and whenever the website’s forms or service providers change.</p>
      </section>
    </main>
  );
}
