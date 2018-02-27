import React from 'react'
import { View, Image, Text } from 'react-native'

const LogoHeader = (props) => {
	return (
		<View style={styles.container}>
			<Image
	          style={styles.image}
	          source={require('../../img/logo.png')}
	          resizeMode={Image.resizeMode.center}
	        />
	        <Text style={{...styles.text, ...props.textStyle}}>MeetU</Text>
	    </View>
	)
}

const styles = {
	image: {
		height: 120
	},
	text: {
		paddingTop: 10,
		fontSize: 25,
		textAlign: 'center'
	},
	container: {
 		justifyContent: 'center',
		alignItems: 'center'
	}
}

export { LogoHeader }