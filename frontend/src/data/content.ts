// Central place for all editable event content.
// Update dates, copy, schedule, and speakers here — components read from this file.

export const site = {
  name: "Qiskit Fall Fest 2026",
  org: "QC IITI",
  orgFull: "Quantum Computing Club, IIT Indore",
  tagline: "Where minds meet on the cloud.",
  description:
    "A student-led quantum computing festival by QC IITI — hands-on Qiskit workshops, industry talks, real networking, and a beginner-friendly hackathon. No prior quantum experience required.",
  dates: "Oct 15-17, 2026",
  location: "Online (Oct 15-16) + IIT Indore campus (Oct 17)",
  registerUrl: "/register/",
  hackathonUrl: "/hackathon/",
  socials: {
    github: "https://github.com/qc-iiti",
    instagram: "https://www.instagram.com/quantum_computing_iiti/",
    linkedin: "https://www.linkedin.com/company/qc-iiti/posts/",
    email: "quantum@iiti.ac.in ",
  },
};

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Decade", href: "/#decade" },
  { label: "Program", href: "/#program" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Hackathon", href: "/#hackathon" },
  { label: "Team", href: "/#team" },
];

export const stats = [
  { value: "3", label: "days of quantum" },
  { value: "Hybrid", label: "online + on-campus" },
  { value: "24k", label: "prize pool", note: "and growing as more sponsors come on board" },
];

export const decade = {
  heading: "Ten years of Qiskit",
  body: "2026 marks a decade since Qiskit opened quantum computing to anyone with a laptop. Fall Fest is our chapter's contribution to that anniversary - a week where students who have never touched a qubit can run a real circuit on real quantum hardware by the end of day one.",
  milestones: [
    { year: "2016", text: "Qiskit is released as an open-source SDK for quantum circuits." },
    { year: "2019", text: "IBM opens cloud access to real quantum processors for developers." },
    { year: "2023", text: "QC IITI is founded as the campus's first quantum computing club." },
    { year: "2026", text: "Qiskit turns 10 - and Fall Fest brings that decade to IIT Indore." },
  ],
};

export type ProgramSession = {
  time?: string;
  title: string;
  speaker?: string;
  track: "Talk" | "Interactive" | "Workshop" | "Ceremony" | "Challenge";
};

export type ProgramDay = {
  day: string;
  date: string;
  mode: "Online" | "Offline";
  tentative?: boolean;
  sessions: ProgramSession[];
};

export const program: ProgramDay[] = [
  {
    day: "Day 1",
    date: "Thursday, Oct 15",
    mode: "Online",
    sessions: [
      { time: "6:00 - 6:45 PM", title: "Speaker session I", track: "Talk" },
      { time: "6:45 - 7:30 PM", title: "Speaker session II", track: "Talk" },
      { time: "7:30 - 8:30 PM", title: "Interactive session", track: "Interactive" },
    ],
  },
  {
    day: "Day 2",
    date: "Friday, Oct 16",
    mode: "Online",
    sessions: [
      { time: "6:00 - 6:45 PM", title: "Speaker session I", track: "Talk" },
      { time: "6:45 - 7:30 PM", title: "Speaker session II", track: "Talk" },
      { time: "7:30 - 8:30 PM", title: "Interactive session", track: "Interactive" },
    ],
  },
  {
    day: "Day 3",
    date: "Saturday, Oct 17",
    mode: "Offline",
    tentative: true,
    sessions: [
      { title: "Inauguration", track: "Ceremony" },
      { title: "Speaker talks", track: "Talk" },
      { title: "Workshop - gearing up for the challenge", track: "Workshop" },
      { title: "The Challenge (afternoon)", track: "Challenge" },
    ],
  },
];

export type Speaker = {
  name: string;
  role: string;
  org: string;
  topic: string;
};

export const speakers: Speaker[] = [
  { name: "Speaker name", role: "Research Scientist", org: "IBM Quantum", topic: "Scaling quantum hardware" },
  { name: "Speaker name", role: "Faculty Advisor", org: "IIT Indore", topic: "Barren plateaus in QML" },
  { name: "Speaker name", role: "Quantum Engineer", org: "Trevasq", topic: "Post-quantum cryptography" },
  { name: "Speaker name", role: "Applied Scientist", org: "Quanfluence", topic: "Quantum finance pipelines" },
];

export const hackathonInfo = {
  status: "Challenge & problem statements drop soon",
  body: "We're finalizing the challenge for this year's hackathon. Register now to lock your spot - full problem statements and rules will be shared with registered teams before Oct 17.",
  prizePool: "\u20B924k",
  prizeNote: "combined across online and offline, and growing as more sponsors come on board.",
};

export const hackathonRules = [
  "Teams of 1-4. Solo hackers are welcome and will be matched with a team on request.",
  "All skill levels welcome - mentors are on hand throughout for beginners.",
  "Code must be written during the hackathon window. Pre-existing libraries and public datasets are fine.",
  "Submit a public repo link and a short demo before the deadline.",
];

export const faqs = [
  {
    q: "Do I need any quantum computing background?",
    a: "No. The online sessions on Day 1 and 2 take you from zero to your first circuit, and mentors are around throughout the hackathon for beginners.",
  },
  {
    q: "Is Fall Fest free?",
    a: "Yes, both the main event and the hackathon are free to attend for students. Seats are limited, so register early.",
  },
  {
    q: "Can I join online?",
    a: "Yes. Day 1 and Day 2 (Oct 15-16) are fully online with speaker sessions and an interactive session each evening. Day 3 (Oct 17) is on-campus at IIT Indore for the inauguration, talks, workshop, and the challenge.",
  },
  {
    q: "What should I bring?",
    a: "A laptop with a browser - Qiskit runs in the cloud, so no local install is required. Student ID for on-campus check-in on Oct 17.",
  },
];
