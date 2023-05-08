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
      <Section1 sectionName="Sport" />
      <Section1 sectionName="Voyages" />
      <SectionCategory sectionName="Genres" />
      <SectionVideosHautes sectionName="Discover" />
    </div>
  );
}

export default Homepage2;
