import Carousel from "../components/Carousel";
import "./Home.css";
import SectionCarousel from "../components/SectionCarousel";
import Counter from "../components/Counter";

export default function Home() {
  return (
    <div>
      <section>
        <Carousel />
      </section>

      <section className="section-container">
        <h2 className="section-title">SECTION 1</h2>
        <SectionCarousel />
      </section>
      <section className="section-container">
        <h2 className="section-title">SECTION 2</h2>
        <SectionCarousel />
      </section>

      <div className="background" />
      <section className="section-container">
        <h2 className="section-title">SECTION 3</h2>
        <SectionCarousel />
      </section>
      <section className="section-container">
        <h2 className="section-title">SECTION 4</h2>
        <Counter />
      </section>
    </div>
  );
}
