import * as React from 'react';
import * as platform from 'platform';
import socket from './socket';


export interface AppProps {
  // compiler: string;
  // framework: string;
}

export class App extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      t: 'aaa'
    }

    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {

    socket.on('connect', async () => {

      console.log('socket connect');

    });

    socket.on('disconnect', async () => {

      console.log('socket disconnect');
    });

    (window as any).socket = socket;
  }

  handleRegister() {
    console.log('clicked')
    socket.emit('register', {
      username: 'sss', //this.loginUsername.getValue(),
      password: 'pwd',//this.loginPassword.getValue(),
      os: platform.os.family,
      browser: platform.name,
      environment: platform.description,
    }, (res) => {
      // if (typeof res === 'string') {
      //   Message.error(res);
      // } else {
      //   action.setUser(res);
      //   action.closeLoginDialog();
      //   window.localStorage.setItem('token', res.token);
      // }
      console.log(res);
    });
  }

  render() {
    return (
      <div>
        <p>Hello World!</p>
        {/* <div onClick=>Btn1</div> */}

        <button onClick={ this.handleRegister }>Log in</button>
      </div>
    )
  }
}
