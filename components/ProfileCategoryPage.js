import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native'
import { Input, Spinner } from './common'
import { ProfileActions, ProfileSelectors } from '../modules/profile'
import { MAIN_COLOR } from '../constants/constants'
import { Button } from 'react-native-elements'

const { getSelectorCategoriesProfile } = ProfileSelectors
// const { } = ProfileActions


class ProfileCategoryPage extends Component { 

	// onNameChange(text) {
	// 	this.props.onProfileChange('name', text)
	// }

	renderButton() {
		// const { loading } = this.props.category
		// if(loading) {
		// 	return <Spinner size="large"/>
		// }
		return(
			<Button
				// disabled={loading}
				raised
				large
				title="Save"
				// onPress={this.onButtonPress.bind(this)} 
				buttonStyle={styles.button}
			/>
		)
	}

	render() {
		console.log('category', this.props.category)
		return (
			<View>

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
	}
}

const mapStateToProps = state => {
	return { category : getSelectorCategoriesProfile(state) }
}

export default connect(mapStateToProps, { })(ProfileCategoryPage);