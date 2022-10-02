// Hack for polyfill import of uuid
import 'react-native-get-random-values';

import React, {Component, useState} from 'react';
import { View } from 'react-native';
import { Text, Image } from 'react-native-elements';

import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import viewNames from '../state/ViewNames';

import { v4 as uuidv4 } from 'uuid';
import * as Location from 'expo-location';

const sessionId = uuidv4();
export default class Start extends Component {
    
    async sendCurrentLocationToServer() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permission to access location was denied');
          return;
        }

        const newLocation = await Location.getCurrentPositionAsync({});
        if (newLocation && newLocation.coords && newLocation.coords.latitude && newLocation.coords.longitude)
        {
            // Make POST request
            fetch('https://hovreporter.azurewebsites.net/locationdetails', {
                        method: 'POST',
                        body: JSON.stringify({
                            'Lat': newLocation.coords.latitude,
                            'Long': newLocation.coords.longitude,
                            'SessionId': sessionId
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((responseJson) => {
                        console.log(JSON.stringify(responseJson));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        }
        else
        {
            console.error("Location call did not yield valid results.");
        }

        this.props.navigation.navigate(viewNames.FinalSuccess);
    }

    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Image 
                                style={contentItems.startMainImage} 
                                source={require('../assets/app-icon.png')} 
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                Just noticed an HOV violation?
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                Let's report your current location to WA State Patrol. It's easy!
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Image 
                                style={contentItems.startReportImage}
                                source={require('../assets/easy.png')} 
                                testID={"Report"}
                                onPress={() => this.sendCurrentLocationToServer()}
                            />
                        </View>
                    </View>
                </View>
                <View style={boundingLayout.footerVersion}>
                    <Text 
                        style={contentItems.versionText}
                        data-i9n-redact={true}>
                        v4.0.3
                    </Text>
                </View>
            </View>
        );
    }
}
