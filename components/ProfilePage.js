import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { ProfileActions } from '../modules/profile'
import { CategoriesSelectors } from '../modules/categories'
import { MAIN_COLOR } from '../constants/constants'
import { NavigationActions } from 'react-navigation'

const { loadInitialProfileState, goToDetails, goToCategory } = ProfileActions
const { getSelectorCategories } = CategoriesSelectors

const firstList = [
  {
    name: 'General',
    icon: 'user',
    iconColor: MAIN_COLOR,
    type: 'font-awesome',
    routeName: 'ProfileGeneral',
    params: {}
  },
  {
    name: 'Password',
    icon: 'key',
    iconColor: MAIN_COLOR,
    type: 'foundation',
    routeName: 'ProfilePassword',
    params: {}
  },
  {
    name: 'Pictures',
    icon: 'folder-images',
    iconColor: MAIN_COLOR,
    type: 'entypo'
  },
]


class ProfilePage extends Component {

	componentWillMount() {
		this.props.loadInitialProfileState()	
	}

	render() {
		const { goToDetails, goToCategory, categories } = this.props
		
		return (
			<View>
				<List containerStyle={{marginBottom: 20}}>
				  {
				    firstList.map((l, i) => (
				      <ListItem
				        roundAvatar
				        leftIcon={{name: l.icon, color: l.iconColor, type: l.type}}
				        key={i}
				        title={l.name}
				        type={l.type}
				        onPress={() => goToDetails(l.routeName, l.params)}
				      />
				    ))
				  }
				</List>

				<List containerStyle={{marginBottom: 20}}>
				  {
				    categories.map(item => {
				    	return (
					      <ListItem
					        roundAvatar
					        leftIcon={{name: item.icon, color: item.iconColor, type: item.type}}
					        key={item._id}
					        title={item.name}
					        type={item.type}
					        onPress={() => goToCategory(item._id)}
					      />
				    )})
				  }
				</List>

			</View>
		)
	}
}

const mapStateToProps = state => {
	return getSelectorCategories(state)
}

export default connect(mapStateToProps, { loadInitialProfileState, goToDetails, goToCategory })(ProfilePage);