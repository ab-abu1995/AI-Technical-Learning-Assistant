import React, { useState } from 'react';
import '../Css/FAQ.css';

const faqData = [
  {
    question: "How do I get started?",
    answer: "Getting started is simple! Just click the 'Get Started' button, create your account, and you can begin uploading your study materials immediately to get AI-powered insights."
  },
  {
    question: "Does AI Technical Learning Assistance collect my school login or course data?",
    answer: "No. We prioritize your privacy. We do not require your school credentials, and we only process the specific documents or data you explicitly upload to the platform."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can manage your subscription through your account settings. If you cancel, you will maintain access to your premium features until the end of your current billing cycle."
  },
  {
    question: "Which study tools are included?",
    answer: "Our platform includes AI summarization, flashcard generation, practice quiz creators, and a 24/7 personal study assistant capable of explaining complex academic concepts."
  },
  {
    question: "Is there a limit to how many files I can upload?",
    answer: "Free users have a monthly upload limit, while our Pro and Genius tiers offer significantly higher limits and support for larger file sizes."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      
      <div className="faq-header">
        <button className="got-questions-btn">
          <span id="faq" className="icon-help"></span> GOT QUESTIONS?
        </button>
        <h1>
          AI Technical Learning Assistance <span className="highlight">FAQ</span>
        </h1>
        <p className="subtitle">
          Everything you need to know about our AI study platform
        </p>
      </div>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question-row">
              <div className="question-icon">?</div>
              <span className="question-text">{item.question}</span>

              <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`}>
                {activeIndex === index ? '▲' : '▼'}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default FAQ;