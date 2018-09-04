import React, { Component } from 'react';
import './App.css';
import recognizeFile from 'watson-speech/speech-to-text/recognize-file';
import SpeechToTextV1 from 'watson-developer-cloud/speech-to-text/v1';
import AuthorizationV1 from 'watson-developer-cloud/authorization/v1';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      model: 'en-US_BroadbandModel',
      formattedMessages: [],
      audioSource: null,
      speakerLabels: true,
      error: null,
      messages: '',
      value: {},
      token: ''
    };
    this.handleMessages = this.handleMessages.bind(this);
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.playFile = this.playFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFinalMessage = this.getFinalMessage.bind(this);
    this.getCurrentMessage = this.getCurrentMessage.bind(this);
    this.getBothCurrentAndFinalMessage = this.getBothCurrentAndFinalMessage.bind(this);
    this.getTranscript = this.getTranscript.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  getToken() {
    const speechService = new SpeechToTextV1({
      username: 'f79ab83b-1938-4e8e-bd0f-fb14cad0a63a',
      password: 'wuf2YOsBzyWv',
      url: 'https://stream.watsonplatform.net/speech-to-text/api',
    });
    let tokenManager = new AuthorizationV1(speechService.getCredentials());
    tokenManager.getToken((err, token) => {
      this.setState({token})
      console.log('token', token);
      console.log('err', err);
    });
  }

  handleFormattedMessage(msg){
    const { formattedMessages } = this.state;
    this.setState({ formattedMessages: formattedMessages.concat(msg) });
  }

  getTranscript(props){
    try {
      // console.log('I got here', props);
      return props.map(msg => msg.results.map((result, i) => (
        <span key={`result-${msg.result_index + i}`}>{result.alternatives[0].transcript}</span>
      )))
      .reduce((a, b) => a.concat(b), [])
      .map((res, i) => {
      let words = res.props.children;
      console.log('words', words);
      return words;
    })
  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
  }

  getFinalMessage() {
    return this.state.formattedMessages.filter(res => res.results
      && res.results.length && res.results[0].final);
  };

  getCurrentMessage() {
    const res = this.state.formattedMessages[this.state.formattedMessages.length - 1];
    if (!res || !res.results || !res.results.length || res.results[0].final) {
      return null;
    }
    return res;
  };

  getBothCurrentAndFinalMessage(){
    const final = this.getFinalMessage();
    const interim = this.getCurrentMessage();
    if (interim) {
      final.push(interim);
    }
    return final;
  }

  playFile() {
      const token = this.state.token;
      console.log('token', token);
      const recognizeStream = recognizeFile({
      file: this.state.file,
      url: 'https://stream.watsonplatform.net/speech-to-text/api',
      token: token,
      smart_formatting: true,
      format: true,
      model: 'en-US_BroadbandModel',
      objectMode: true,
      interim_results: true,
      word_alternatives_threshold: 0.01,
      timestamps: true,
  })


  recognizeStream.on('data', this.handleFormattedMessage);
  recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  
  recognizeStream.on('close', function(event) { onEvent('Close:', event); });
  function onEvent(name, event) {
      // console.log('name', name);
      // console.log('event', event);
    };
  }

  fetchToken() {
    return fetch('/api/credentials').then((res) => {
      if (res.status !== 200) {
        throw new Error('Error retrieving auth token');
      }
    })
      .then(creds => this.setState({ ...creds })).catch((err) => {console.log('err', err)});
  }

  handleUploadClick() {
    this.playFile();
  }

  handleChange(e) {
    this.setState({file: e.target.files[0]})
  }

  handleMessages(msg) {
    this.setState({ formattedMessages: msg });
  }

  componentDidMount() {
    this.getToken();
  }
  render() {
    const messages = this.getBothCurrentAndFinalMessage();
    return (
      <div className="App">
          <div className="container">  
            <form id="contact" action='http://localhost:3005/audio' encType="multipart/form-data" method="post">
                <h1>Audio converter to text</h1>
                <div>
                  <label htmlFor="file">Choose audio to upload</label>
                  <input type="file" id="file" name="file" onChange={ (e) => this.handleChange(e) } />
                </div>
                <fieldset>
                  <button name="submit" type="button" id="contact-submit" data-submit="...Sending" value='submit'onClick={this.handleUploadClick}>
                    Upload Audio File
                  </button>
                </fieldset>
            </form>
        </div>
        <div id="message-area">
          <textarea id="textarea" rows="4" cols="50" 
          value={messages.length === 0 ? '' : this.getTranscript(messages)} 
          />
        </div>
      </div>
    );
  }
}

export default App;
