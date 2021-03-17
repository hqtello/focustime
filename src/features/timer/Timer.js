import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper'
import { useKeepAwake } from 'expo-keep-awake'

import { colors } from '../../utils/colors';
import { spacing, fontSizes } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing'

const DEFAULT_TIME = 0.1

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  // Keep the app awake while we are using it:
  useKeepAwake()

  const [minutes, setMinutes] = useState()
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1)

  const handleStart = () => {
    setIsStarted(true);
  };

  const handlePause = () => {
    setIsStarted(false);
  };

  const onProgress = progress => {
    setProgress(progress)
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval), 5000)
    }
    else 
      Vibration.vibrate(5000)
  }

  const onEnd = () => {
    vibrate()
    setMinutes()
    setProgress(1)
    setIsStarted(false)
    onTimerEnd()
  }

  const changeTime = min => {
    setMinutes(min)
    setProgress(1)
    setIsStarted(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <View style={{ paddingTop: spacing.md }}>
          <ProgressBar
            color='#5E84E2'
            style={{ height: 10 }}
            progress={progress}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
          <Timing onChangeTime={changeTime}/>
        </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={handlePause} />
        ) : (
          <RoundedButton title="start" onPress={handleStart} />
        )}
      </View>
      <View style={styles.clearSubject}>
          <RoundedButton 
            title="-"
            size={50}
            onPress={() => clearSubject()}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.lg
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.md,
    letterSpacing: 1.5
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
