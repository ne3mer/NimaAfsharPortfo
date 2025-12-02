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

interface AdminEmailProps {
  name: string;
  email: string;
  type: string;
  budget: string;
  features: string[];
  message: string;
}

export const AdminEmail = ({
  name,
  email,
  type,
  budget,
  features,
  message,
}: AdminEmailProps) => (
  <Html>
    <Head />
    <Preview>New Project Lead from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Project Lead 🚀</Heading>
        <Text style={text}>
          You have received a new project request from <strong>{name}</strong>.
        </Text>
        
        <Section style={section}>
          <Text style={label}>Contact Info</Text>
          <Text style={value}>{name} ({email})</Text>
          
          <Hr style={hr} />
          
          <Text style={label}>Project Type</Text>
          <Text style={value}>{type}</Text>
          
          <Text style={label}>Budget Range</Text>
          <Text style={value}>{budget}</Text>
          
          <Text style={label}>Features</Text>
          <Text style={value}>{features.join(", ")}</Text>
          
          <Hr style={hr} />
          
          <Text style={label}>Message</Text>
          <Text style={value}>{message || "No message provided."}</Text>
        </Section>
        
        <Link href="https://nimastudio.vercel.app/admin/leads" style={button}>
          View in Dashboard
        </Link>
      </Container>
    </Body>
  </Html>
);

export const UserEmail = ({ name }: { name: string }) => (
  <Html>
    <Head />
    <Preview>We received your project request!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thanks for reaching out! 👋</Heading>
        <Text style={text}>
          Hi {name},
        </Text>
        <Text style={text}>
          We have successfully received your project details. Nima will review your requirements and get back to you within 24 hours to discuss the next steps.
        </Text>
        <Text style={text}>
          In the meantime, feel free to check out our latest work.
        </Text>
        <Link href="https://nimastudio.vercel.app/work" style={button}>
          View Portfolio
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
