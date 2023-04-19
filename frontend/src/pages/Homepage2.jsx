import React from "react";
import "../styles/Homepage2.scss";

import Featured from "../components/Featured";
import SectionTeasers from "../components/SectionTeasers";
import Section1 from "../components/Section1";
import SectionVideosHautes from "../components/SectionVideosHautes";
import SectionCategory from "../components/SectionCategory";

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
