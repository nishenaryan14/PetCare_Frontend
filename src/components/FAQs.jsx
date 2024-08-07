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
    question: "How do I search for pets nearby?",
    answer:
      "You can search for pets nearby by enabling location services and using the search feature in the app.",
  },
  {
    question: "How do I add pets to my favorites?",
    answer:
      "You can add pets to your favorites by clicking the heart icon next to each pet listing.",
  },
  {
    question: "How do I view my favorite pets?",
    answer:
      "You can view your favorite pets by navigating to the 'Favorites' section in your profile.",
  },
  {
    question: "Can I filter pets based on breed and other criteria?",
    answer:
      "Yes, you can filter pets based on breed, age, size, and other criteria using the filter options in the search feature.",
  },
  {
    question: "How is my location information used?",
    answer:
      "Your location information is used to show you pets that are available for adoption near you.",
  },
];

const FAQs = () => {
  return (
    <Container sx={{ py: 5, my: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ marginLeft: "8px", fontSize: "14px", color: "grey" }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQs;
