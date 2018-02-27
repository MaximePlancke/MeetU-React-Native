import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native'
import { List, ListItem } from 'react-native-elements'


const list = [
  {
    name: 'Message',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Message 2',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'MessagesDetail'
  },
]

class MessagesDetailsPage extends Component { 

	render() {
		return (
			<List containerStyle={{marginBottom: 20}}>
			  {
			    list.map((l, i) => (
			      <ListItem
			        roundAvatar
			        avatar={{uri:l.avatar_url}}
			        key={i}
			        title={l.name}
			      />
			    ))
			  }
			</List>
		)
	}
}

const mapStateToProps = state => {
	return {};
}

export default connect(mapStateToProps, {  })(MessagesDetailsPage);