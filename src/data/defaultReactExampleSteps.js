import React from 'react';

const ExampleComponent = () => <h1>Example Component</h1>;

// ----- Example Steps ----- //
const defaultReactExampleSteps = [
  { component: ExampleComponent },
  {
    form: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        workExperience: {
          description: 'Work experience in years',
          type: 'integer',
          minimum: 0,
          maximum: 100,
        },
      },
      required: ['firstName'],
    },
  },
  {
    form: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
];

export default defaultReactExampleSteps;
