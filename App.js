import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { colors } from './src/utils/colors'
import { Timer } from './src/features/timer/Timer'
import { Focus } from './src/features/focus/Focus'
import { FocusHistory } from './src/features/focus/FocusHistory'

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null) 
  const [focusHistory, setFocusHistory] = useState([])

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, {
      key: String(focusHistory.length + 1),
      subject, 
      status
    }])
  }

  const onClear = () => {
    setFocusHistory([])
  }

  useEffect(() => {
    if (focusSubject) {
      setFocusHistory([...focusHistory, focusSubject])
    }
  }, [focusSubject])

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    } catch(err) {
      console.log(err)
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory')

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.stringify(history))
      } 
    }catch(err) {
        console.log(err)
    }
  }

  useEffect(() => {
    loadFocusHistory()
  },[])

  useEffect(() => {
    saveFocusHistory()
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject 
        ? <Timer 
            focusSubject={focusSubject} 
            onTimerEnd={() => {
              addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED)
              setFocusSubject(null)
            }}
            clearSubject={() => {
              addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED)
              setFocusSubject(null)
            }}
          />
        : <View style={{ flex: 1 }}>
            <Focus addSubject={setFocusSubject}/>
            <FocusHistory 
              focusHistory={focusHistory}
              onClear={onClear}
            />
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Constants.statusBarHeight
  }
});
