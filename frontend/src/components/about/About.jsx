import React from "react";

function About() {
  const handleContactClick = () => {
    window.location.href = "mailto:contact@example.com";
  };

  return (
    <div>
      <h2>About</h2>
      <p>
        Welcome to our online video platform! We are dedicated to providing you
        with a wide range of high-quality videos for your entertainment. Whether
        you're looking for movies, TV shows, documentaries, or educational
        content, we've got you covered.
      </p>
      <p>
        Our premium option offers exclusive access to even more exciting
        content. Upgrade to premium and unlock a world of additional videos,
        ad-free streaming, and offline downloads. Don't miss out on this
        enhanced viewing experience!
      </p>
      <p>
        If you have any questions, suggestions, or feedback, please feel free to
        contact us. Click the button below to send us an email, and our friendly
        support team will get back to you as soon as possible.
      </p>
      <button type="button" onClick={handleContactClick}>
        Nous contacter
      </button>
    </div>
  );
}

export default About;
