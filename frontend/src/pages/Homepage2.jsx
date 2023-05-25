import React, { useState, useEffect } from "react";
import useApi from "../api/useAPI";
import "../styles/index.css";
import Featured from "../components/Sections/Featured";
import SectionTeasers from "../components/Sections/SectionTeasers";
import Section1 from "../components/Sections/Section1";
import SectionVideosHautes from "../components/Sections/SectionVideosHautes";
import SectionCategory from "../components/Sections/SectionCategory";

const sectionType = (data) => {
  switch (data.section_type) {
    case "section avec catégorie":
      return <SectionCategory sectionName={data.name} />;

    case "section sans catégorie":
      return <Section1 sectionName={data.name} />;

    default:
      return null;
  }
};

function Homepage2() {
  const [data, setData] = useState([]);
  const api = useApi();

  const getSectionData = async () => {
    await api
      .get("sections")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getSectionData();
  }, []);

  return (
    <div>
      <Featured />
      <SectionTeasers />
      <Section1 sectionName="Section 1" />
      <Section1 sectionName="Section 2" />
      {/* {data.map((section) => (
        <Section1 key={section.id} sectionName={section.name} />
      ))} */}
      {data.map((section, index) => {
        return <div key={index}>{sectionType(section)}</div>;
      })}
      <SectionCategory sectionName="Section 3" />
      <SectionVideosHautes sectionName="Section 4" />
    </div>
  );
}

export default Homepage2;
