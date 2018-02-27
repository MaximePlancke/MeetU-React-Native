import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, SectionList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { selectMessage } from '../modules/messages/MessagesActions'


class MessagesListPage extends Component {

	goToDetail(item) {
		this.props.selectMessage(item)
	}

	renderItem({ item }) {
		return (
			<ListItem
				roundAvatar
				keyExtractor={item => item.key}
				title={item.name}
				subtitle={item.subtitle}
				avatar={{uri:item.avatar_url}}
				onPress={() => this.goToDetail(item)}
			/>
		)
	}

	render() {
		return (
			<List containerStyle={{marginBottom: 20}}>
				<SectionList
			        renderItem={this.renderItem.bind(this)}
			        sections={this.props.messages.list}
			    />
			</List>
		)
	}
}

const mapStateToProps = state => {
	let { messages } = state;
	return { messages };
}

export default connect(mapStateToProps, { selectMessage })(MessagesListPage);