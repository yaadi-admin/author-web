import { useState } from "react";

const educationData = [
  {
    id: 1,
    title: "Backend Programming",
    academy: "CoderHouse Course",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2014",
    endYear: "2016",
  },
  {
    id: 2,
    title: "Faculty of Design",
    academy: "Lviv National Academy of Arts",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2012",
    endYear: "2014",
  },
  {
    id: 3,
    title: "High School",
    academy: "IT Future",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2010",
    endYear: "2012",
  },
];

const experienceData = [
  {
    id: 1,
    title: "UI Head & Manager",
    company: "Soft Tech Inc.",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2020",
    endYear: false,
  },
  {
    id: 2,
    title: "UI / UX Specialist",
    company: "Kana Design Studio",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2018",
    endYear: "2020",
  },
  {
    id: 3,
    title: "Plugins Developer",
    company: "Fiverr.com",
    dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startYear: "2016",
    endYear: "2018",
  },
];

const Resume = () => {
  const [educationToggle, setEducationToggle] = useState(1);
  const [experienceToggle, setExperienceToggle] = useState(1);
  return (
    <section className="lui-section lui-gradient-bottom" id="resume-section">
    </section>
  );
};
export default Resume;
