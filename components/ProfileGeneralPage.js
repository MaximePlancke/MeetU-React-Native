import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native'
import { Input, Spinner } from './common'
import { ProfileActions, ProfileSelectors } from '../modules/profile'
import { MAIN_COLOR } from '../constants/constants'
import { Button } from 'react-native-elements'

const { getSelectorGeneralProfile } = ProfileSelectors
const { onProfileChange, saveUser } = ProfileActions


class ProfileGeneralPage extends Component { 

	onNameChange(text) {
		this.props.onProfileChange('name', text)
	}

	onUsernameChange(text) {
		this.props.onProfileChange('username', text)
	}

	onBioChange(text) {
		this.props.onProfileChange('bio', text)
	}

	onGenderChange(itemValue, itemIndex) {
		this.props.onProfileChange('gender', itemValue)
	}

	onButtonPress() {
		const { name, username, bio, gender } = this.props.profile
		this.props.saveUser({ name, username, bio, gender })
	}

	renderButton() {
		const { loading } = this.props.profile
		if(loading) {
			return <Spinner size="large"/>
		}
		return(
			<Button
				disabled={loading}
				raised
				large
				title="Save"
				onPress={this.onButtonPress.bind(this)} 
				buttonStyle={styles.button}
			/>
		)
	}

	render() {
		const { profile } = this.props
		return (
			<View>
				<Input 
					label="Name"
					placeholder=""
					value={profile.name}
					onChangeText={this.onNameChange.bind(this)}
				/>

				<Input 
					label="Email"
					placeholder=""
					value={profile.username}
					onChangeText={this.onUsernameChange.bind(this)}
				/>

				<Input 
					multiline={true}
					style={styles.textArea}
					label="Few lines about yourself"
					placeholder=""
					value={profile.bio}
					onChangeText={this.onBioChange.bind(this)}
				/>

				<Picker
				  selectedValue={profile.gender}
				  onValueChange={this.onGenderChange.bind(this)}>
				  <Picker.Item label="Man" value="1" />
				  <Picker.Item label="Woman" value="2" />
				</Picker>

				<View style={{height: 80}}>
					{this.renderButton()}
				</View>

			</View>
		)
	}
}

const styles = {
	button: {
		backgroundColor: MAIN_COLOR
	},
	textArea: {
	}
}

const mapStateToProps = state => {
	return { profile : getSelectorGeneralProfile(state) }
}

export default connect(mapStateToProps, { onProfileChange, saveUser })(ProfileGeneralPage);