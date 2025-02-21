import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FaqPage = () => {
  // C-DAC Questions
  const cdacFaqs = [
    {
      question: "What is C-DAC?",
      answer: "C-DAC (Centre for Development of Advanced Computing) is a premier research and development organization that focuses on high-performance computing, grid computing, and software development for various applications.",
    },
    {
      question: "What programs are offered by C-DAC?",
      answer: "C-DAC offers various postgraduate and diploma programs in fields like Software Engineering, Cyber Security, Embedded Systems, and VLSI Design.",
    },
    {
      question: "How can I apply for a C-DAC program?",
      answer: "You can apply online through the official C-DAC website. The application process usually involves filling out an online form and paying the application fee.",
    },
    {
      question: "Is there any entrance exam for C-DAC programs?",
      answer: "Yes, C-DAC conducts a Common Admission Test (C-DAC CAT) for admission to its various courses. The test evaluates candidates on their technical knowledge and aptitude.",
    },
    {
      question: "What is the eligibility criteria for C-DAC programs?",
      answer: "The eligibility criteria vary based on the program. Generally, candidates should have a Bachelor's degree in a relevant field of study (Engineering/IT/Computer Science).",
    },
  ];

  // Admission Questions
  const admissionFaqs = [
    {
      question: "What is the admission process?",
      answer: "The admission process involves submitting an online application, providing necessary documents, and attending an interview if required.",
    },
    {
      question: "What documents are required for admission?",
      answer: "Typically, you will need identification proof, academic transcripts, and proof of residency.",
    },
    {
      question: "Is there an application fee?",
      answer: "Yes, a non-refundable application fee is required to complete the process.",
    },
    {
      question: "How can I track my application status?",
      answer: "You can track your application status by logging into your account on our portal and navigating to the 'Application Status' section.",
    },
    {
      question: "When do the admissions open?",
      answer: "Admissions usually open in the month of May for the upcoming academic year. Check the official website for exact dates.",
    },
    {
      question: "Is there a deadline for submission of application?",
      answer: "Yes, there is a deadline for submitting applications. Ensure that you complete the application before the due date, which is typically stated on the admission portal.",
    },
    {
      question: "What is the eligibility criteria for admission?",
      answer: "The eligibility criteria vary depending on the program. Generally, a minimum of 50% in the relevant qualification (undergraduate or equivalent) is required.",
    },
    {
      question: "Do you offer financial aid or scholarships?",
      answer: "Yes, financial aid and scholarships may be available for eligible students. Check the 'Financial Aid' section on the admission portal for more details.",
    },
    {
      question: "How can I contact the admission office?",
      answer: "You can contact the admission office via email or phone. The contact details are available on the admission portal under the 'Contact Us' section.",
    },
    {
      question: "Can I apply for multiple programs?",
      answer: "Yes, you can apply for multiple programs, but each application requires a separate submission and fee payment.",
    },
  ];

  return (
    <div className="container py-5 mt-5">
     <h1 className="text-center mb-4" style={{ color: '#FF8C00', fontWeight: 'bold', marginTop:29 }}>Frequently Asked Questions</h1>

      {/* C-DAC FAQ Accordion */}
      <h2 className="text-center mb-3">C-DAC Related Questions</h2>
      <div className="accordion" id="cdacAccordion">
        {cdacFaqs.map((faq, index) => (
          <FaqItem key={index} faq={faq} index={index} parentId="cdacAccordion" />
        ))}
      </div>

      {/* Admission FAQ Accordion */}
      <h2 className="text-center mb-3 mt-5">Admission Related Questions</h2>
      <div className="accordion" id="admissionAccordion">
        {admissionFaqs.map((faq, index) => (
          <FaqItem key={index} faq={faq} index={index} parentId="admissionAccordion" />
        ))}
      </div>
    </div>
  );
};

// FaqItem Component
const FaqItem = ({ faq, index, parentId }) => {
  return (
    <div className="accordion-item mb-2">
      <h2 className="accordion-header" id={`heading${parentId}-${index}`}>
        <button
          className="accordion-button collapsed bg-primary text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${parentId}-${index}`}
          aria-expanded="false"
          aria-controls={`collapse${parentId}-${index}`}
          data-bs-parent={`#${parentId}`}  // Ensures only one item opens at a time within the group
        >
          {faq.question}
        </button>
      </h2>
      <div
        id={`collapse${parentId}-${index}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${parentId}-${index}`}
        data-bs-parent={`#${parentId}`}
      >
        <div className="accordion-body">{faq.answer}</div>
      </div>
    </div>
  );
};

export default FaqPage;
