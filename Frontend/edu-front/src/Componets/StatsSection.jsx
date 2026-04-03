import { useEffect, useState, useRef } from "react";
import "../Css/StatsSection.css";

function StatItem({ target, label, suffix = "", start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return; // 👈 only run when visible

    let startValue = 0;
    const duration = 2000;
    const increment = target / (duration / 20);

    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(startValue));
      }
    }, 20);

    return () => clearInterval(counter);
  }, [start, target]);

  return (
    <div className="stat-item">
      <h2>{count}{suffix}</h2>
      <p>{label}</p>
    </div>
  );
}

function StatsSection() {
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-section" ref={sectionRef}>
      <StatItem target={4.9} label="App Store Rating" suffix="/5" start={startAnimation} />
      <StatItem target={30} label="Answered Requests" suffix="K+" start={startAnimation} />
      <StatItem target={10} label="Active Students" suffix="K+" start={startAnimation} />
    </div>
  );
}

export default StatsSection;