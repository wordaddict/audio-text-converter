import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default function Transcript(props) {
    try {
        console.log('I got here', props);
      const results = props.messages.map(msg => msg.results.map((result, i) => (
        <span key={`result-${msg.result_index + i}`}>{result.alternatives[0].transcript}</span>
      ))).reduce((a, b) => a.concat(b), []);
      return (
        <div>
          {results}
        </div>
      );
    } catch (ex) {
      console.log(ex);
      return <div>{ex.message}</div>;
    }
  }
  

export default Transcript;

console.log('cheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

Transcript.propTypes = {
  messages: PropTypes.array.isRequired, // eslint-disable-line
};

// < Transcript messages={messages}/>