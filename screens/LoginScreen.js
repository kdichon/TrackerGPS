import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';

import SVG, { Image, Circle, ClipPath, Svg } from 'react-native-svg';

import Animated, { EasingNode } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
//import { AuthContext } from '../navigation/AuthProvider';

const { width, height } = Dimensions.get('window');
const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolateNode, Extrapolate, concat, } = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: EasingNode.inOut(EasingNode.linear),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class TrackerGPS extends Component {
  constructor() {
    super();
    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolateNode(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  render() {
    return (
      <View style={styles.accueil}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }],
          }}>
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('../assets/bg.jpg')}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYmid slice"
              clipPath="#clip"
            />
          </Svg>
        </Animated.View>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                CONNEXION I &gt;
              </Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
            }}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{ rotate: concat(this.rotateCross, 'deg') }],
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <TextInput
              placeholder="E-mail"
              style={styles.textInput}
              placeholderTextColor="black"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              //isFocused();
            />
            <TextInput
              placeholder="Mot de passe"
              style={styles.textInput}
              placeholderTextColor="black"
              secureTextEntry={true}
            />
          <Animated.View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              CONNEXION &gt;I
            </Text>
          </Animated.View>
          </Animated.View>

        </View>
      </View>
    );
  }
}
export default TrackerGPS;

const styles = StyleSheet.create({
  accueil: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  closeButton: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  textInput: {
    height: 50,
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
  },
});
