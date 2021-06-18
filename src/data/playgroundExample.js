// =============================================== //
//
//  This is the dummy JSON data that populates
//  the Playground's <textarea> input.
//  See: <Playground> component
//  See: /public/playground.html for entry point
//
// =============================================== //
const playgroundExample = [
  {
    form: {
      type: 'object',
      properties: {
        bookTitle: { type: 'string' },
        author: { type: 'string' },
        publishDate: {
          description: 'When was the book published?',
          type: 'integer',
          minimum: 0,
          maximum: 2021,
        },
      },
      required: ['bookTitle'],
    },
  },

  {
    form: {
      type: 'object',
      properties: {
        publishingCompany: { type: 'string' },
      },
      required: ['publishingCompany'],
    },
  },
];

export default playgroundExample;
