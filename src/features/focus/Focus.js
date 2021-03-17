import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-paper'

import { RoundedButton } from '../../components/RoundedButton'
import { fontSizes, spacing } from '../../utils/sizes'
import { colors } from '../../utils/colors'

export function Focus({ addSubject }) {
  const [subject, setSubject] = useState(null)
  return(
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={
              ({ nativeEvent }) => {
                setSubject(nativeEvent.text)
              }}
          />
          <RoundedButton 
            title='+' 
            size={50}
            onPress={() => {
              addSubject(subject)
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.xl,
    letterSpacing: 2,
    textAlign: 'center'    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md
  }
})
