import React, { useState } from 'react';
import { SHA256 } from 'crypto-js';
import { Container, Form, Button, Card } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State variables for email, PDF file, email hash, and PDF file hash
  const [email, setEmail] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [emailHash, setEmailHash] = useState('');
  const [pdfFileHash, setPdfFileHash] = useState('');

  // Event handler for email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Event handler for file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  // Function to convert input to hash values
  const convertToHash = () => {
    // Calculate hash value for email
    const emailHashValue = SHA256(email).toString();
    setEmailHash(emailHashValue);

    if (pdfFile) {
      // Read and convert PDF file to hash value
      const reader = new FileReader();
      reader.onloadend = () => {
        const pdfData = reader.result;
        const pdfHashValue = SHA256(pdfData).toString();
        setPdfFileHash(pdfHashValue);
      };
      reader.readAsBinaryString(pdfFile);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Email and PDF Hash Converter</h2>
      {/* Card for email and file input */}
      <Card className="mt-4 p-4">
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="text" value={email} onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>PDF File:</Form.Label>
            <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" onClick={convertToHash}>
            Convert to Hash
          </Button>
        </Form>
      </Card>
      {/* Card to display email hash value */}
      <Card className="mt-4 p-4">
        <Card.Title>Email Hash Value:</Card.Title>
        <Card.Text>{emailHash}</Card.Text>
      </Card>
      {/* Card to display PDF file hash value */}
      {pdfFile && (
        <Card className="mt-4 p-4">
          <Card.Title>PDF File Hash Value:</Card.Title>
          <Card.Text>{pdfFileHash}</Card.Text>
        </Card>
      )}
    </Container>
  );
}

export default App;
