<div align="center">
<h1>Feedback Widget</h1>

Start harvesting user feedback on your web application quickly and easily!

</div>

## Features

* Out-of-the-Box functionality.
* Easily connect to Google Analytics to track user feedback.
* Implement with React or Vanilla JS
* `Uniforms` gives the developer limitless options for quickly building out complex forms.
* Multiple popups and forms can be utilized in sequence.
* Multiple theme styles are ready to go.
* ESLint enabled.

# Install

After installing and running the app locally you can easily check out different implementations. Check out `/playground` to experiment with different JSON structures and themes in real-time.

### Install

```sh
$ npm install
```

### Start Dev Server

```sh
$ npm start
```

### Production Build

```sh
$ npm run build
... create files in /dist
```

# Options

| Name | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| analyticsConfig | Array | null | | Optional. Expects an array of objects. `[{ name: 'ga', id: 'UA-111111111-1' }]`
| analyticsConfig.`name` | String | null | | Only accepts Google Analytics for now. `'ga'`
| analyticsConfig.`id` | String | null | | Expects the full Google Analytics account ID including the `UA-`.
| analyticsName | String | feedback-widget | | High-level name that shows up inside of the Google Analytics event.
| currentPath | String | `window.location.pathname` | | Used to provide Google Analytics with context when tracking events.
| onSubmit | Function | null | | This custom submit function will fire after the `<Step>` is complete. (but *before* proceeding to the next step.)
| steps | Array | see below | ✔ | **see below** |
| theme | String | ripplex | | Can be either `ripplex`, `xrpl`, or `paystring`.

# Step Options

Only two step types are supported right now: `component` for custom React Components and `form` for Uniform autoforms.

```js
options.steps = [
  { component: MyComponent },
  { form: ... }
]
```

| Name | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| component | React Component | | | Your custom React Component. See implementation examples below.
| form | Uniform Object | | |  Your custom Uniform autoform. See implementation examples below. Also check out documentation on building forms with Uniform here: https://uniforms.tools/docs/tutorials-basic-uniforms-usage/


# Implementation Examples

After installing and running the app locally you can easily check out different implementations. Check out `/playground` to experiment with different JSON structures and themes in real-time.

**Please note: The vanilla implementation is lacking practical features. We recommend that each step be a *form* or *component* for now.**

## Vanilla JS

```js
// Options
const options = {
  analyticsConfig: [
    { name: 'ga', id: 'UA-111111111-1' },
    { name: 'gtm', id: 'GTM-THHW334' },
  ],
  analyticsName: 'Feedback Widget Tracker',
  theme: 'xrpl',
  steps: [{
    someArbitraryKey: 'Some arbitrary value.'
  }]
};

// Init
const r = new WidgetClass(options);
```

## Uniforms

Uniforms Docs: https://uniforms.tools/docs/tutorials-basic-uniforms-usage/

```js
// Options
const options = {
  theme: 'xrpl',
  analyticsConfig: [{ name: 'ga', id: 'UA-111111111-1' }],
  onSubmit: (stepProps) => console.log('Custom onSubmit.'),
  steps: [
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
      }
    },
    {
      form: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
        required: ['message'],
      }
    }
  ]
};

// Init
const r = new WidgetClass(options);
```

## React

```js
// Custom Components
function myCustomStepOne() { return <>1. I am a custom React component</> }
function myCustomStepTwo() { return <>2. I am also a custom React component</> }

// Options
const analytics = [{ name: 'ga', id: 'UA-111111111-1' }];
const steps = [
  { component: myCustomStepOne },
  { component: myCustomStepTwo },
];
```

```js
// Embed
<Widget analyticsConfig={analytics} steps={steps} />
```

Custom React components require additional work to manually program sequence events. React Components will automatically inherit all possible `Step` methods through the props argument. See `react-step-builder` package for additional details.

|   Property  |    Type     |     Desc    |
| ----------- | ----------- | ----------- |
|  hasNext()  |   Function  | Returns `true` if there is another `<Step>` in the sequence. |
|  hasPrev()  |   Function  | Returns `true` if there is a previous `<Step>` in the sequence. |
|  isFirst()  |   Function  | Returns `true` if the current `<Step>` is the first one in the sequence. |
|  isLast()  |   Function  | Returns `true` if the current `<Step>` is the last one in the sequence. |
|  jump(step)  |   Function  | Jumps to whatever `<Step>` is passed as an argument. (step: `INT`) |
|  next()  |   Function  | Go to next sequence. |
|  prev()  |   Function  | Go to previous sequence. |
|  size  |   Number  | Total number of `<Step>`s in the sequence. |
|  stepData  |   React Component  | The React Component for this step. |


```js
//
// Your custom React Component will access the above
// methods through props as long as the Component is
// being assigned as a step.
//
// {
//  ...
//  steps: [ { component: myCustomStepOne } ],
//  ...
// }
//
function myCustomStepOne(props) {
  return (
    <>
      <p>I am a paragraph. When you are ready, click the next button.</p>
      <button onClick={ props.next() }>Next</button>
    </>
  )
}
```

## Combine React + Uniforms
```js
const options = {
  steps: [

    // Step One
    { component: myCustomStepOne },

    // Step Two
    {
      form: {
        type: 'object',
        properties: {
          firstName: { type: 'string' }
          lastName: { type: 'string' }
          age: { type: 'integer' }
        }
      }
    }
  ]
}
```

# Configure Google Analytics (optional)

When instantiating the `FeedbackWidget` simply pass in your Google Analytics ID to start tracking feedback:

```js
const options = {
  analyticsConfig: [{
    name: 'ga',
    id: 'UA-111111111-1'
  }]
};

const r = new WidgetClass(options);
```

# Libraries & Third Parties

* React
* Uniforms
* Step, Steps (`react-step-builder` package)

# Roadmap

* Integrate Google Tag Manager and other analytic tracking.
* Develop custom vanilla js implementation beyond `Autoform` and `React Components`.

# License
This project is licensed under the terms of the MIT license. See `LICENSE.txt`