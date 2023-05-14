import React, { useState } from 'react';
import './index.css';
import { Input, Stack, useToast, Container, Textarea, Button, FormControl, FormLabel } from '@chakra-ui/react'

export default function App() {
  const [state, setState] = useState({
    id: 3,
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const toast = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(
      'https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries',
      {
        body: JSON.stringify(state),
        method: 'POST',
      }
    )
      .then((result) => result.json())
      .then((successResponse) => {
        setState({ name: "", email: "", message: "", subject: "" });
        toast({
          title: 'Success.',
          description: "Form was successfully submitted.",
          status: 'success',
          duration: 3000
        })
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: "Form submission failed.",
          status: 'warning',
          duration: 3000
        })
      });
  };

  const applyChange = (event) => {
    const newState = { ...state };
    newState[event.currentTarget.name] = event.currentTarget.value;
    setState(newState);
  };

  return (
    <Container centerContent>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Subject</FormLabel>
            <Input placeholder="Enter Subject" name="subject" value={state.subject} onChange={applyChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter Name" name="name" value={state.name} onChange={applyChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type='email' required placeholder="Enter Email" name="email" value={state.email} onChange={applyChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Enter Message" name="message" value={state.message} onChange={applyChange} />
          </FormControl>
          <Button type="submit"> SUBMIT </Button>
        </Stack>
      </form>
    </Container>
  );
}
