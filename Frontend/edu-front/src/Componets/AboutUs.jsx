import React, { useEffect, useRef, useState } from "react";
import "../Css/AboutUs.css";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);

          const update = () => {
            start += increment;
            if (start < target) {
              setCount(Math.ceil(start));
              requestAnimationFrame(update);
            } else {
              setCount(target);
            }
          };

          update();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <h3 ref={ref}>{count}+</h3>;
};

const AboutUs = () => {
  return (
    <div className="about">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <span id="aboutus" className="badge">About Us</span>
          <h1>Hybrid AI Technical Learning Assistance</h1>
          <p>
            Experience a personalized education journey that follows you
            from the classroom to your home.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="about-container">
        <div className="about-card">

          <h2>Smarter Learning. Seamless Experience.</h2>

          <p>
            Our Hybrid AI platform transforms technical education by combining
            classroom learning with intelligent digital support. It adapts to
            your pace, helping you understand complex topics faster and more clearly.
          </p>

          <p>
            With 24/7 AI assistance, you are never learning alone. Whether you're
            studying, practicing, or revising, your AI companion guides you step by
            step in real time.
          </p>

          <p>
            We bridge the gap between offline learning and online excellence,
            creating a continuous and personalized learning experience built
            for the future.
          </p>

          

        </div>
      </section>

      {/* STATS (UNCHANGED) */}
      <section className="stats">
        <div className="stat">
          <Counter target={40} />
          <p>Years Experience</p>
        </div>

        <div className="stat">
          <Counter target={200} />
          <p>Projects Completed</p>
        </div>

        <div className="stat">
          <Counter target={68} />
          <p>Team Members</p>
        </div>

        <div className="stat">
          <Counter target={99} />
          <p>Awards Won</p>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;