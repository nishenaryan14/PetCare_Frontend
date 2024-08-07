import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How do I book a nurse?",
    answer: "You can book a nurse by signing up and creating your profile.",
  },
  {
    question: "What services do you offer?",
    answer: "We offer elder care, baby care, post-surgery care, and more.",
  },
];

const FAQs = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQs;
