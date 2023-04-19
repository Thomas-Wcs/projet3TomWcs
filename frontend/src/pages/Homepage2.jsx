import React from "react";
import "../styles/Homepage2.scss";

import Featured from "../components/Featured";
import Section from "../components/Section";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import SectionCategory from "../components/SectionCategory";

function Homepage2() {
  return (
    <div>
      <Featured />
      <Section />
      <Section1 sectionName="Section 1" />
      <Section1 sectionName="Section 2" />
      <SectionCategory sectionName="Section 3" />
      <Section2 sectionName="Section 4" />
    </div>
  );
}

export default Homepage2;
