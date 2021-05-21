import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { Steps, Step } from 'react-step-builder';
import config from '../styles/theme.styles';
import StepComponent from './StepComponent';
import '../styles/widget.scss';

// ======================== //
//                          //
//  Widget: React Component
//                          //
// ======================== //
const Widget = (props) => {

  console.log('=-=-props: ', props)

  const [isOpen, setIsOpen] = useState(true);
  const [openAnimation, setOpenAnimation] = useState('entering');
  const theme = props.theme;
  const themeValues = config.themes[theme].styles

  const onClose = () => {
    setOpenAnimation('exiting');
    setIsOpen(false);
  };
  
  return (
    <div style={themeValues.container} className={`widget docked-widget widget-${openAnimation} docked-widget-${config.themes[theme].position}`}>
      <div className={`widget widget-${isOpen}`}>
        <div><button id="closeFeedback" onClick={onClose}>X</button></div>
        <Steps>
          {steps.map((s, idx) => {
            console.log('s: ', s)
            return (
              <Step
                key={idx}
                component={StepComponent}
                stepData={s}
                themeValues={themeValues}
                onSubmit={props.onSubmit}
                handleClose={onClose}
                currentPath={props.currentPath}
              />
            )
          })}
        </Steps>
      </div>
    </div>
  )
}


// OLD - Delete Me
class WidgetOLD extends Component {
  constructor(props) {
    super(props);

    console.log('widget.js constructor props: ', props);

    this.state = {
      opened: false,
      showDock: true,
    };
  }

  onSubmit = (event, abc) => {
    event.preventDefault()
    if (this.props.onSubmit) {
      this.props.onSubmit(abc)
    }
  }

  handleToggleOpen = () => {
    this.setState((prev) => {
      let { showDock } = prev;
      if (!prev.opened) {
        showDock = false;
      }
      return {
        showDock,
        opened: !prev.opened,
      };
    });
  }

  handleWidgetExit = () => {
    this.setState({
      showDock: true,
    });
  }

  renderBody = () => {
    const { showDock } = this.state;

    if (!showDock) return '';

    return (
      <button
        type="button"
        className="dock"
        onClick={this.handleToggleOpen}
        onKeyPress={this.handleToggleOpen}
      >
        ^ OPEN ^
      </button>
    );
  }

  render() {
    console.log('\n|| Widget.render() ||\n\n');
    // const { opened } = this.state;
    // const body = this.renderBody();
    // const { bodyText, headerText, footerText } = this.props;
    // const [isOpen, setIsOpen] = useState(true);
    // const [openAnimation, setOpenAnimation] = useState('entering');
    const theme = 'paystring'
    const themeValues = config.themes[theme].styles

    return (
      <div style={themeValues.container} className={`widget docked-widget widget-${openAnimation} docked-widget-${config.themes[theme].position}`}>
        <div className={`widget widget-${isOpen}`}>
          <div><button id="closeFeedback" onClick={onClose}>X</button></div>
          <Steps>
            {steps.map((s) => (
              <Step
                key={s.name}
                component={CustomStep}
                stepData={s}
                themeValues={themeValues}
                onSubmit={onSubmit}
                handleClose={onClose}
                // analytics={analytics}
                currentPath={currentPath}
              />
            ))}
          </Steps>
        </div>
      </div>
      // <div className="docked-widget">
      //   <Transition in={opened} timeout={250} onExited={this.handleWidgetExit}>
      //     {(status) => (
      //       <div className={`widget widget-${status}`}>
      //         <div className="widget-header">
      //           <div className="widget-header-title">
      //             {headerText}
      //           </div>
      //           <button
      //             type="button"
      //             className="widget-header-icon"
      //             onClick={this.handleToggleOpen}
      //             onKeyPress={this.handleToggleOpen}
      //           >
      //             X
      //           </button>
      //         </div>
      //         <div className="widget-body">
      //           {bodyText}
      //           <Steps>
      //             <Step title="My First Step" component={Step1} />
      //             <Step title="My Second Step" component={Step2} />
      //             <Step title="My Third Step" component={Step3} />
      //           </Steps>
      //         </div>
      //         <div className="widget-footer">
      //           {footerText}
      //         </div>
      //       </div>
      //     )}
      //   </Transition>
      //   {body}
      // </div>
    );
  }
}

const Step1 = (props) => {

  useEffect(() => {
    console.log('Step1 props: ', props)
  }, [])

  return (
    <>
      <h1>Step 1</h1>
      <button onClick={props.next}>Next</button>
    </>
  )
}

const Step2 = () => {
  return <h1>Step 2</h1>
}

const Step3 = () => {
  return <h1>Step 3</h1>
}

// Widget.propTypes = {
//   headerText: PropTypes.string,
//   bodyText: PropTypes.string,
//   footerText: PropTypes.string,
// };

// Widget.defaultProps = {
//   headerText: 'Header',
//   bodyText: 'Body',
//   footerText: 'Footer',
// };

export default Widget;
