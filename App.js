import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import respond from './src/apiCall';
let avatarImg = 'https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg';

class NewtonBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
    this.respondMessage = this.respondMessage.bind(this);
    this.requestApi = this.requestApi.bind(this);
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey there! I\'m NewtonBot. How can I help you today?',
          createdAt: new Date(Date.now()),
          user: {
            _id: 2,
            name: 'Isaac NewtonBot',
            avatar: avatarImg,
          },
        },
      ],
      availableID: 3,
    });
  }

  requestApi(messageText, callback){
      // /derive 2x -> /derive
      var command = messageText.match(/([/])\w+/g)[0];
      // /derive -> derive
      var operation = command.slice(1);
      // /derive 2x -> 2x
      var expression = messageText.slice(messageText.indexOf(operation) + operation.length);

      respond(operation, expression, callback);
  }

  respondMessage(text, messages = []){
    this.requestApi(text, (response) => {
      messages.unshift({
          _id: this.state.availableID,
          text: response,
          createdAt: new Date(Date.now()),
          user: {
            _id: 2,
            name: 'Isaac NewtonBot',
            avatar: avatarImg,
          },
      });
      this.onSend(messages);
    });
    this.state.availableID += 2;
  }

  onSend(messages = []) {
    if(messages[0].user._id === 1){
      this.respondMessage(messages[0].text, messages);
    }

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default NewtonBot;
