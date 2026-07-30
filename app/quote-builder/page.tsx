"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Script from "next/script";

type TrainingType = "Initial" | "Refresher";
type OverlapGroup = "sanding-machines" | "centre-lathes" | "welding-processes" | "milling-machines";

type Course = {
  code: string;
  name: string;
  initial: number;
  refresher: number;
  adjustment: number;
  group: string;
  overlapGroup?: OverlapGroup;
};

const overlapCopy: Record<OverlapGroup, { summary: string; notice: string }> = {
  "sanding-machines": {
    summary: "sanding-machine",
    notice: "Shared sanding-machine theory applied: each additional selected sanding machine adds 50% of its calculated hours.",
  },
  "centre-lathes": {
    summary: "centre-lathe",
    notice: "Shared centre-lathe theory applied: the additional selected type of centre lathe adds 50% of its calculated hours.",
  },
  "welding-processes": {
    summary: "welding-process",
    notice: "Shared welding-process theory applied: each additional selected welding or cutting process adds 50% of its calculated hours.",
  },
  "milling-machines": {
    summary: "milling-machine",
    notice: "Shared milling-machine theory applied: each additional selected type of milling machine adds 50% of its calculated hours.",
  },
};

// Base guided hours are the D&TA minimum training times for a typical group of four.
// The adjustment values remain private and scale those hours for the entered group size.
const courses: Course[] = [
  { code: "PCHS", name: "Primary Core", initial: 6, refresher: 3, adjustment: 0, group: "Core courses" },
  { code: "SCHS", name: "Secondary Core", initial: 6, refresher: 3, adjustment: 0, group: "Core courses" },
  { code: "SFHS", name: "Food Technology", initial: 6, refresher: 3, adjustment: 0, group: "Core courses" },
  { code: "STHS", name: "Textiles Processes", initial: 6, refresher: 4, adjustment: 0, group: "Core courses" },
  { code: "SSHS", name: "Systems and Control", initial: 2, refresher: 1, adjustment: 0, group: "Core courses" },
  { code: "S11HS", name: "H&S for Site Staff: Portable Power Tools", initial: 6, refresher: 3, adjustment: .2, group: "Core courses" },

  { code: "SMHS-4", name: "Hand Tools", initial: 1, refresher: 1, adjustment: .2, group: "Standard School Workshop" },
  { code: "SMHS-5", name: "Portable Drills", initial: .5, refresher: .5, adjustment: .2, group: "Standard School Workshop" },
  { code: "SMHS-6", name: "Pillar / Bench Drilling Machines", initial: 1, refresher: 1, adjustment: .2, group: "Standard School Workshop" },
  { code: "SMHS-7", name: "Power Fretsaws", initial: 1, refresher: 1, adjustment: .2, group: "Standard School Workshop" },
  { code: "SMHS-8", name: "Belt Sanding Machine", initial: 1, refresher: 1, adjustment: .2, group: "Standard School Workshop", overlapGroup: "sanding-machines" },
  { code: "SMHS-9", name: "Disc Sanding Machine", initial: 1, refresher: 1, adjustment: .2, group: "Standard School Workshop", overlapGroup: "sanding-machines" },
  { code: "SMHS-10", name: "Portable Sanders (Orbital / Belt)", initial: .5, refresher: .5, adjustment: .2, group: "Standard School Workshop" },
  { code: "SMHS-11", name: "Strip Heaters / Line Benders", initial: .5, refresher: .5, adjustment: .2, group: "Standard School Workshop" },
  { code: "SMHS-12", name: "Vacuum Forming Machine", initial: 1, refresher: .5, adjustment: .2, group: "Standard School Workshop" },
  { code: "SMHS-13", name: "Soldering Irons (for electronics)", initial: 1, refresher: 1, adjustment: .2, group: "Standard School Workshop" },

  { code: "S1HS-1", name: "Band Saw", initial: 3, refresher: 2, adjustment: .2, group: "Technicians / Prep" },
  { code: "S1HS-2", name: "Table / Circular Saw", initial: 3, refresher: 2, adjustment: .2, group: "Technicians / Prep" },
  { code: "S1HS-3", name: "Mitre / Chop Saw", initial: 1, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "S9HS-1", name: "Portable Circular Saw", initial: 1, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "S8HS-1", name: "Overhand Planer", initial: 2, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "S8HS-2", name: "Thicknesser", initial: 2, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "S9HS-2", name: "Portable Planing Machine", initial: 1, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "S10HS", name: "Grinding and Sharpening (does include changing wheels)", initial: 4, refresher: 3, adjustment: .2, group: "Technicians / Prep" },
  { code: "SMHS-1", name: "Off-hand / Bench Grinding Machine (does not include changing wheels)", initial: 1, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "S9HS-3", name: "Portable / Angle Grinder", initial: 1, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "SMHS-2", name: "Metal-cutting Bandsaw", initial: 1, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "SMHS-3", name: "Power Hacksaw", initial: 1, refresher: 1, adjustment: .2, group: "Technicians / Prep" },
  { code: "S12HS", name: "H&S for D&T Technicians", initial: 6, refresher: 3, adjustment: 0, group: "Technicians / Prep" },

  { code: "S7HS", name: "Wood-turning lathe", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Woodworking" },
  { code: "SMHS-14", name: "Bobbin Sanding Machine", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking", overlapGroup: "sanding-machines" },
  { code: "SMHS-15", name: "Mortising Machine", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking" },
  { code: "S9HS-4", name: "Portable Jigsaw / Reciprocating Saw / Multitool", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking" },
  { code: "S9HS-5", name: "Portable Router", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking" },
  { code: "S9HS-6", name: "Router Table", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking" },
  { code: "S9HS-7", name: "Biscuit Jointer / Tenon Jointer", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking" },
  { code: "S1HS-4", name: "Radial Arm Saw", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking" },
  { code: "S1HS-5", name: "Vertical Panel Saw", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Woodworking" },
  { code: "S6HS-4", name: "CNC Router", initial: 4, refresher: 2, adjustment: .2, group: "Specialist Woodworking", overlapGroup: "milling-machines" },

  { code: "S3HS", name: "Casting Non-ferrous Metals (Gas-fired Crucible)", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Metalworking / Engineering" },
  { code: "SMHS-16", name: "Low Temperature (Pewter) Casting", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Metalworking / Engineering" },
  { code: "SMHS-17", name: "Brazing", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Metalworking / Engineering" },
  { code: "SMHS-18", name: "Forging", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Metalworking / Engineering" },
  { code: "SMHS-19", name: "Guillotines, Shears & Trimmers", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Metalworking / Engineering" },
  { code: "SMHS-20", name: "Polishing Machines", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Metalworking / Engineering" },

  { code: "S2HS-1", name: "Metal (Centre) Lathe", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "centre-lathes" },
  { code: "S2HS-2", name: "CNC Lathe", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "centre-lathes" },
  { code: "S6HS-1", name: "Vertical / Horizontal Axis Milling Machine", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "milling-machines" },
  { code: "S6HS-3", name: "CNC Milling Machine", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "milling-machines" },
  { code: "S4HS-1", name: "MIG/MAG Welding", initial: 3, refresher: 2, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "welding-processes" },
  { code: "S4HS-2", name: "TIG Welding", initial: 3, refresher: 2, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "welding-processes" },
  { code: "S4HS-3", name: "Spot Welding", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "welding-processes" },
  { code: "S4HS-4", name: "MMA Welding", initial: 3, refresher: 2, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "welding-processes" },
  { code: "S4HS-5", name: "Plasma Cutting", initial: 2, refresher: 2, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "welding-processes" },
  { code: "S5HS-1", name: "Oxy-Acetylene Welding", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "welding-processes" },
  { code: "S5HS-2", name: "Oxy-Propane Welding", initial: 4, refresher: 3, adjustment: .2, group: "Specialist Metalworking / Engineering", overlapGroup: "welding-processes" },

  { code: "TENG-1", name: "Laser cutter", initial: 1, refresher: .5, adjustment: .2, group: "Specialist Plastics" },
  { code: "TENG-2", name: "3D Printer", initial: 1, refresher: .5, adjustment: .2, group: "Specialist Plastics" },
  { code: "SMHS-21", name: "Hot Wire Cutters", initial: .5, refresher: .5, adjustment: .2, group: "Specialist Plastics" },
  { code: "SMHS-22", name: "Plastic Welding", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Plastics" },
  { code: "SMHS-23", name: "Injection / Extrusion Moulding", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Plastics" },
  { code: "SMHS-24", name: "Blow Moulding", initial: 1, refresher: 1, adjustment: .2, group: "Specialist Plastics" },
  { code: "SMHS-25", name: "Moulding Trimming", initial: .5, refresher: .5, adjustment: .2, group: "Specialist Plastics" },
  { code: "SMHS-26", name: "Convection Oven for Heating Plastics", initial: .5, refresher: .25, adjustment: .2, group: "Specialist Plastics" },
  { code: "TENG-4", name: "Composite materials (Carbon / Kevlar / Glass / Natural Fibre Reinforced Plastics)", initial: 3, refresher: 1.5, adjustment: .2, group: "Specialist Plastics" },
];

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const maxDelegatesFor = (course: Course) =>
  course.code === "PCHS" || course.code === "SCHS" ? 20 : 8;

export default function QuoteBuilderPage() {
  const [trainingType, setTrainingType] = useState<TrainingType>("Initial");
  const [start, setStart] = useState("09:00");
  const [finish, setFinish] = useState("16:00");
  const [breakHours, setBreakHours] = useState(1);
  const [totalDelegates, setTotalDelegates] = useState(0);
  const [delegates, setDelegates] = useState<Record<number, number>>({});
  const [showQuote, setShowQuote] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error" | "setup" | "captcha">("idle");
  const [limitMessage, setLimitMessage] = useState("");
  const calculatorRef = useRef<HTMLElement>(null);

  const selected = useMemo(() => {
    const chosen = courses.map((course, index) => ({
      ...course,
      delegates: delegates[index] || 0,
      baseHours: trainingType === "Initial" ? course.initial : course.refresher,
      hours: delegates[index]
        ? (trainingType === "Initial" ? course.initial : course.refresher) *
          (1 - course.adjustment + (delegates[index] / 4) * course.adjustment)
        : 0,
    })).filter((course) => course.delegates > 0);

    const fullTimeCourse: Partial<Record<OverlapGroup, number>> = {};
    chosen.forEach((course, index) => {
      if (!course.overlapGroup) return;
      const current = fullTimeCourse[course.overlapGroup];
      if (current === undefined || course.hours > chosen[current].hours) {
        fullTimeCourse[course.overlapGroup] = index;
      }
    });

    return chosen.map((course, index) => {
      const sharedTheoryFactor =
        course.overlapGroup && fullTimeCourse[course.overlapGroup] !== index ? .5 : 1;
      return {
        ...course,
        hours: course.hours * sharedTheoryFactor,
        sharedTheoryFactor,
      };
    });
  }, [delegates, trainingType]);

  const dailyHours = Math.max(0, (toMinutes(finish) - toMinutes(start)) / 60 - breakHours);
  const totalHours = selected.reduce((sum, course) => sum + course.hours, 0);
  const totalDays = dailyHours > 0 ? totalHours / dailyHours : 0;
  const roundedDays = Math.ceil(totalDays * 2) / 2;
  const indexedCourses = courses.map((course, index) => ({ course, index }));
  const courseGroups = indexedCourses.reduce<Array<{ name: string; items: typeof indexedCourses }>>((groups, item) => {
    const currentGroup = groups.at(-1);
    if (currentGroup?.name === item.course.group) {
      currentGroup.items.push(item);
    } else {
      groups.push({ name: item.course.group, items: [item] });
    }
    return groups;
  }, []);
  const submissionSummary = selected.map((course) =>
    `${course.code} — ${course.name}: ${course.delegates} delegate${course.delegates === 1 ? "" : "s"}; ${course.hours.toFixed(2)} calculated hours${course.sharedTheoryFactor === .5 && course.overlapGroup ? `; 50% shared ${overlapCopy[course.overlapGroup].summary} theory reduction applied` : ""}`
  ).join("\n");
  const allocationInvalid = selected.some((course) =>
    course.delegates > totalDelegates || course.delegates > maxDelegatesFor(course)
  );
  const appliedOverlapGroups = (Object.keys(overlapCopy) as OverlapGroup[]).filter((overlapGroup) =>
    selected.some((course) => course.overlapGroup === overlapGroup && course.sharedTheoryFactor === .5)
  );

  const setCount = (index: number, value: number, course: Course) => {
    const courseMaximum = maxDelegatesFor(course);
    const allowedMaximum = Math.min(totalDelegates || courseMaximum, courseMaximum);
    if (value > allowedMaximum) {
      setLimitMessage(
        totalDelegates <= courseMaximum
          ? `${course.name}: the allocation cannot exceed the total of ${totalDelegates} unique delegate${totalDelegates === 1 ? "" : "s"}.`
          : `${course.name}: this course has a maximum group size of ${courseMaximum}.`
      );
    } else {
      setLimitMessage("");
    }
    const safe = Math.max(0, Math.min(allowedMaximum, Number.isFinite(value) ? value : 0));
    setDelegates((current) => ({ ...current, [index]: safe }));
  };

  const scrollToCalculator = () => calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFormState("setup");
      return;
    }
    setFormState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const captchaResponse = formData.get("h-captcha-response");
    if (typeof captchaResponse !== "string" || !captchaResponse.trim()) {
      setFormState("captcha");
      return;
    }
    formData.append("access_key", accessKey);
    formData.append("subject", "D&TA training quote request");
    formData.append("from_name", "Tarrant Engineering website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result = await response.json() as { success?: boolean };
      const sent = response.ok && result.success === true;
      setFormState(sent ? "sent" : "error");
      if (sent) form.reset();
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <Script src="https://web3forms.com/client/script.js" strategy="afterInteractive" />
      <main>
      <section className="hero">
        <div className="schematic schematic-one" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> D&amp;TA accredited training</p>
          <h1>Training<br />quote<br />builder</h1>
          <p className="hero-lead">Plan the training your school needs and get an immediate estimate of the time involved.</p>
          <button className="primary-cta" onClick={scrollToCalculator}>Build my training plan <span>→</span></button>
          <p className="micro-copy">Prices from £400 per day for in-school training. Your formal price is confirmed after review.</p>
        </div>
        <aside className="hero-panel">
          <p className="panel-number">01 / PLAN</p>
          <h2>From workshop need<br />to practical plan.</h2>
          <p>Select initial or refresher training, add delegates to the relevant courses and adjust the working day. Your estimate updates instantly.</p>
          <div className="mini-result"><span>LIVE ESTIMATE</span><strong>{roundedDays ? roundedDays.toFixed(1) : "0.0"} days</strong></div>
        </aside>
      </section>

      <section className="calculator-section" ref={calculatorRef}>
        <div className="section-intro">
          <p className="eyebrow light"><span /> Training planner</p>
          <h2>Configure your training</h2>
          <p>Enter the details you know. You can revise the plan as many times as you like before requesting a formal quotation.</p>
        </div>

        <div className="planner-shell">
          <div className="setup-toolbar">
            <div>
              <span>01 / SETUP</span>
              <h3>Enter delegate numbers<br />and timings for the day</h3>
            </div>
            <p>Start with the total number of different people attending. Choose the training type, then adjust the start, finish and break times if required.</p>
          </div>
          <div className="settings-bar">
            <label className="delegate-total">
              <span>Total unique delegates <b aria-hidden="true">*</b></span>
              <small>Count each person once, even if they need several courses.</small>
              <input
                type="number"
                min="1"
                max="100"
                inputMode="numeric"
                aria-required="true"
                value={totalDelegates || ""}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(100, Number(e.target.value)));
                  setTotalDelegates(value);
                  setLimitMessage("");
                  setDelegates((current) => Object.fromEntries(Object.entries(current).map(([key, count]) => {
                    const course = courses[Number(key)];
                    return [key, Math.min(count, value, course ? maxDelegatesFor(course) : count)];
                  })));
                }}
              />
            </label>
            <fieldset>
              <legend>Training type</legend>
              <div className="segmented">
                {(["Initial", "Refresher"] as TrainingType[]).map((type) => (
                  <button key={type} type="button" className={trainingType === type ? "active" : ""} onClick={() => setTrainingType(type)}>{type}</button>
                ))}
              </div>
            </fieldset>
            <label>Start time<input type="time" value={start} onChange={(e) => setStart(e.target.value)} /></label>
            <label>Finish time<input type="time" value={finish} onChange={(e) => setFinish(e.target.value)} /></label>
            <label>Breaks (hours)<input type="number" min="0" max="8" step=".25" value={breakHours} onChange={(e) => setBreakHours(Number(e.target.value))} /></label>
            <div className="day-length"><span>Training day</span><strong>{dailyHours.toFixed(1)} hrs</strong></div>
          </div>
          {trainingType === "Refresher" && (
            <p className="planner-notice refresher" role="status">
              <strong>Refresher training reminder:</strong>{" "}all D&amp;TA training being refreshed must be current and have been completed within the past five years.
            </p>
          )}

          <div className="course-toolbar">
            <div><span>02 / COURSES</span><h3>Enter delegate numbers for each course</h3></div>
          </div>
          {!totalDelegates && <p className="planner-notice">Enter the total number of unique delegates (above) before allocating them to courses.</p>}
          {allocationInvalid && <p className="planner-notice error">A course allocation exceeds the permitted group size or the total number of unique delegates.</p>}
          {limitMessage && <p className="planner-notice error" role="alert">{limitMessage}</p>}
          {appliedOverlapGroups.map((overlapGroup) => (
            <p key={overlapGroup} className="planner-notice info">{overlapCopy[overlapGroup].notice}</p>
          ))}

          <div className="course-list">
            <div className="course-head"><span>Course</span><span>Guided hours for ~4 delegates</span><span>Number of Delegates</span></div>
            {courseGroups.map((group) => (
              <details className="course-group" key={group.name}>
                <summary>
                  <span>{group.name}</span>
                  <small>{group.items.length} course{group.items.length === 1 ? "" : "s"}</small>
                  <span className="course-group-icon" aria-hidden="true" />
                </summary>
                <div>
                  {group.items.map(({ course, index }) => {
                    const codeIsInHeading = course.group.includes(`(${course.code})`);
                    const courseMaximum = maxDelegatesFor(course);
                    return (
                      <div className={`course-row ${delegates[index] ? "selected" : ""}`} key={`${course.code}-${course.name}`}>
                        <div className={`course-name ${codeIsInHeading ? "code-in-heading" : ""}`}>
                          {!codeIsInHeading && <span className="course-code">{course.code}</span>}
                          <strong>{course.name}</strong>
                        </div>
                        <span className="guided-hours">{trainingType === "Initial" ? course.initial : course.refresher} hrs</span>
                        <div className="stepper">
                          <button type="button" disabled={!totalDelegates} aria-label={`Remove one delegate from ${course.name}`} onClick={() => setCount(index, (delegates[index] || 0) - 1, course)}>−</button>
                          <input aria-label={`Delegates for ${course.name}; maximum ${courseMaximum}`} type="number" min="0" max={Math.min(totalDelegates || courseMaximum, courseMaximum)} disabled={!totalDelegates} value={delegates[index] || 0} onChange={(e) => setCount(index, Number(e.target.value), course)} />
                          <button type="button" disabled={!totalDelegates} aria-label={`Add one delegate to ${course.name}; maximum ${courseMaximum}`} onClick={() => setCount(index, (delegates[index] || 0) + 1, course)}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>

          <div className="estimate-caveat">
            <strong>Planning estimate only</strong>
            <p>Guided hours assume typical delivery conditions. The formal estimate will also consider machine availability, staff experience, workshop arrangements and other practical factors. For example, training eight delegates on one centre lathe would require substantially more time than the standard guided hours.</p>
          </div>

          <div className="result-bar" aria-live="polite">
            <div className="result-icon">✓</div>
            <div><span>Estimated training</span><strong>{roundedDays.toFixed(1)} days</strong><small>{totalHours.toFixed(1)} training hours across {selected.length} course{selected.length === 1 ? "" : "s"}</small></div>
            <button type="button" disabled={!selected.length || !dailyHours || !totalDelegates || allocationInvalid} onClick={() => {
              setShowQuote(true);
              window.setTimeout(() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" }), 20);
            }}>Request a formal quote <span>→</span></button>
          </div>
        </div>
      </section>

      <section className={`quote-section ${showQuote ? "open" : ""}`} id="quote">
        <div className="quote-copy">
          <p className="eyebrow"><span /> Formal estimate</p>
          <h2>Ready to turn the plan into a quote?</h2>
          <p>Send your name, email, organisation and postcode with the calculated training plan. Tarrant Engineering will review the combination of courses and respond with a formal estimate.</p>
          <div className="association">
            <strong>D&amp;TA accredited training</strong>
            <span>Training aligned with the Design &amp; Technology Association</span>
          </div>
        </div>
        <form className="quote-form" onSubmit={submitQuote}>
          <input type="hidden" name="training_type" value={trainingType} />
          <input type="hidden" name="total_unique_delegates" value={totalDelegates} />
          <input type="hidden" name="training_days" value={roundedDays.toFixed(1)} />
          <input type="hidden" name="calculated_hours" value={totalHours.toFixed(2)} />
          <input type="hidden" name="training_start_time" value={start} />
          <input type="hidden" name="training_finish_time" value={finish} />
          <input type="hidden" name="break_hours" value={breakHours.toFixed(2)} />
          <input type="hidden" name="training_day_hours" value={dailyHours.toFixed(2)} />
          <input type="hidden" name="estimate_basis" value="Planning estimate only. Formal timing may change after review of machine availability, staff experience, workshop arrangements and other practical delivery factors." />
          <textarea hidden readOnly name="course_plan" value={submissionSummary} />
          <div className="form-grid">
            <div className="form-section-heading full"><span>01</span><h3>Contact details</h3></div>
            <label>Name<input required name="name" autoComplete="name" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" /></label>
            <label>Organisation<input required name="organisation" autoComplete="organization" /></label>
            <label>Postcode<input required name="postcode" autoComplete="postal-code" /></label>
            <label className="full">Practical details for the estimate <span>(optional)</span><textarea name="notes" rows={5} placeholder="Please include the number of relevant machines available and the extent of delegates’ prior experience or training." /></label>
            <div className="full">
              <div className="h-captcha" data-captcha="true" />
            </div>
          </div>
          <div className="submit-row">
            <div><strong>{roundedDays.toFixed(1)} days</strong><span>calculated estimate</span></div>
            <button disabled={formState === "sending" || !selected.length || !totalDelegates || allocationInvalid}>{formState === "sending" ? "Sending…" : "Send my training plan"} <span>→</span></button>
          </div>
          {formState === "sent" && <p className="form-message success">Thank you — your training plan has been sent.</p>}
          {formState === "error" && <p className="form-message error">The form could not be sent. Please try again.</p>}
          {formState === "setup" && <p className="form-message error">Form delivery is not configured yet. Add the Web3Forms access key as <code>NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code>.</p>}
          {formState === "captcha" && <p className="form-message error">Please complete the spam-protection check before sending your training plan.</p>}
          <p className="privacy-note">Your details will only be used to prepare and respond to this quotation request.</p>
        </form>
      </section>

      </main>
    </>
  );
}
