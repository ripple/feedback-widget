import React, { useState, useEffect } from 'react';
import { Widget } from './WidgetComponent';
import playgroundExampleJSON from '../data/playgroundExampleJSON';

// =============================================== //
//
//  Playground
//
// =============================================== //
const Playground = (props) => {
  // ------------------------------ //
  //  State
  // ------------------------------ //
  const [ready, setReady] = useState(false)
  const [themeName, setThemeName] = useState(props.theme)
  const [textValue, setTextValue] = useState('');
  const [textareaJson, setTextareaJson] = useState(playgroundExampleJSON);

  // ------------------------------ //
  //  Events
  // ------------------------------ //
  const changeTheme = (event) => setThemeName(event.target.value);

  const submitForm = (event) => {
    event.preventDefault();
    const newTextValue = event.target.userJson.value;
    try {
      setTextareaJson(eval(`(${newTextValue})`));
      setTextValue(newTextValue);
    } catch(e) {
      alert('Invalid JSON.');
    }
    return false;
  }

  // - - - - - - - - - - - - - - - - //
  //  fn: Init
  // - - - - - - - - - - - - - - - - //
  const init = function init() {
    if (!textValue || textValue === '' || textValue === 'textArea') {
      setTextValue(JSON.stringify(playgroundExampleJSON, null, 2));
    }
    setReady(true);
  }

  // - - - - - - - - - - - - - - - - //
  //  fn: Reset Ready
  // - - - - - - - - - - - - - - - - //
  const resetReady = function resetReady() {
    setReady(false);
    setTimeout(() => setReady(true), 1)
  }

  // ------------------------------ //
  // Hooks
  // ------------------------------ //
  useEffect(init, []);
  useEffect(resetReady, [textareaJson])

  // ------------------------------ //
  //  JSX
  // ------------------------------ //
  return ready ?
    <>
      <h1>Playground</h1>

      {/* ----- TextArea Playground ----- */}
      <h3>JSON Playground (<a href="https://uniforms.tools/docs/tutorials-basic-uniforms-usage/" target="_blank">Documentation</a>)</h3>
      <form onSubmit={ (e) => submitForm(e) }>
        <textarea name="userJson" defaultValue={textValue} rows={40} cols={70} style={{ resize: 'none' }} />
        <br />
        <button type="submit">Save</button>
      </form>


      {/* ----- Select Theme ----- */}
      <h3>Theme:</h3>
      <select onChange={ (e) => changeTheme(e) } value={themeName}>
        <option value="xrpl">xrpl</option>
        <option value="ripplex">RippleX</option>
        <option value="paystring">PayString</option>
      </select>

      {/* ----- Widget ----- */}
      <Widget {...props} steps={textareaJson} theme={themeName} />
    </> : null
};

export default Playground;
