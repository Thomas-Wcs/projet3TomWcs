import React from "react";

import "../styles/index.css";

import Featured from "../components/Sections/Featured";
import SectionTeasers from "../components/Sections/SectionTeasers";
import Section1 from "../components/Sections/Section1";
import SectionVideosHautes from "../components/Sections/SectionVideosHautes";
import SectionCategory from "../components/Sections/SectionCategory";

function Homepage2() {
  return (
    <div>
      <Featured />
      <SectionTeasers />
      <Section1 sectionName="Section 1" />
      <Section1 sectionName="Section 2" />
      <SectionCategory sectionName="Section 3" />
      <SectionVideosHautes sectionName="Section 4" />
    </div>
  );
}

export default Homepage2;
