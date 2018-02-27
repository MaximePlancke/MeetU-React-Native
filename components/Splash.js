import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Animated } from 'react-native'
import { Button } from 'react-native-elements'
import { AuthActions, AuthSelectors } from '../modules/auth'
import { MAIN_COLOR } from '../constants/constants'
import { LogoHeader } from './common'

const { loadInitialAuthState } = AuthActions

class Splash extends Component {

	constructor(){
        super();
        this.state = { fadeAnim: new Animated.Value(0.3) };
    }

	componentWillMount() {
		this.props.loadInitialAuthState()	
	}

	componentDidMount() {
		Animated.loop(
			Animated.sequence([
				Animated.timing(                  
					this.state.fadeAnim,            
					{
						toValue: 1,                  
						duration: 2000,              
					}
				),
				Animated.timing(                  
					this.state.fadeAnim,            
					{
						toValue: 0.3,                  
						duration: 2000,              
					}
				)
			])
		).start();                    
	}

	render() {
		return (
			<View style={styles.container}>
				<Animated.View style={{ opacity: this.state.fadeAnim }}>
					<LogoHeader textStyle={{color: 'white'}}/>
	      		</Animated.View>
			</View>
		)
	}
}

const styles = {
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: MAIN_COLOR
	},
	text: {
		marginTop: 20,
		fontSize: 30,
		color: "white"
	}
}

const mapStateToProps = state => {
	return {};
}

export default connect(mapStateToProps, { loadInitialAuthState })(Splash);