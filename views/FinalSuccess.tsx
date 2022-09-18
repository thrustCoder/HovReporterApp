import React, {Component} from 'react';
import { Linking, View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

export default class FinalSuccess extends Component {
    clearAllStateFn() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Icon
                                name='check-circle'
                                type='font-awesome'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h2 style={contentItems.mainText}>
                                DONE!
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                We will report the location of violation to WA State Patrol.
                            </Text>
                            <Text style={contentItems.mainText}>
                                You can go back home by pressing 'Done'.
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Button style={contentItems.mainButtonSecondaryLong} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    testID={"FinalSuccess.BackToStart"}
                                    title="Done" 
                                    onPress={() => this.clearAllStateFn()}
                            />
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Text 
                                style={contentItems.mainTextCramped} 
                                onPress={() => Linking.openURL('https://www.wsp.wa.gov/i-want-to/compliment-or-complaint/')}>
                                Send a direct message on WA State Patrol site instead.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
