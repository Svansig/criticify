import React from "react";
import axios from "axios";

async function getUsername(token) {
    // console.log("into function")
  let axiosObject = {
      method: 'get',
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + token },
    json: true
  };
  let userObject = await axios(axiosObject);
//   console.log(userObject.data.display_name);
//   this.setState({user:userObject.display_name}).bind(User)
  return userObject.data.display_name;
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.token = props.access_token;
    this.state = {
      user: 'init'
    };
  }

  componentDidMount() {
    getUsername(this.token).then((fetchedName)=> {
        // console.log(fetchedName)
        this.setState({ user: fetchedName })
    })
  };

  render() {
    return (
      <div>
        <span>User object: </span>
        <span>{this.state.user}</span>
      </div>
    );
  }
}

export default User;
