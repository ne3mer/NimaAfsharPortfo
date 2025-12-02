import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";

interface ContactAdminEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const ContactAdminEmail = ({
  firstName,
  lastName,
  email,
  message,
}: ContactAdminEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Message from {firstName} {lastName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Message 📬</Heading>
        <Text style={text}>
          You have received a new message from <strong>{firstName} {lastName}</strong>.
        </Text>
        
        <Section style={section}>
          <Text style={label}>Sender</Text>
          <Text style={value}>{firstName} {lastName} ({email})</Text>
          
          <Hr style={hr} />
          
          <Text style={label}>Message</Text>
          <Text style={value}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const ContactUserEmail = ({ firstName }: { firstName: string }) => (
  <Html>
    <Head />
    <Preview>We received your message!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thanks for contacting us! 👋</Heading>
        <Text style={text}>
          Hi {firstName},
        </Text>
        <Text style={text}>
          We have received your message. Nima will review it and get back to you as soon as possible.
        </Text>
        <Link href="https://nimastudio.vercel.app" style={button}>
          Visit Website
        </Link>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#000000",
  color: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#cccccc",
};

const section = {
  padding: "24px",
  border: "1px solid #333",
  borderRadius: "12px",
  marginTop: "20px",
  marginBottom: "20px",
};

const label = {
  color: "#888888",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  marginBottom: "4px",
};

const value = {
  color: "#ffffff",
  fontSize: "16px",
  marginBottom: "16px",
};

const hr = {
  borderColor: "#333",
  margin: "20px 0",
};

const button = {
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  color: "#000000",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "20px",
};
