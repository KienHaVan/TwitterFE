import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { authenticate } from '../../lib/api/auth';
import { useAuth } from '../../context/AuthContext';

const Authenticate = () => {
  const { email } = useSearchParams();
  const [code, setCode] = useState('');
  const router = useRouter();
  const { updateAuthToken } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: authenticate,
  });
  const onConfirm = async () => {
    if (typeof email !== 'string') return;
    try {
      const token = await mutateAsync({
        email,
        emailToken: code,
      });
      await updateAuthToken(token.authToken);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sign in or create an account</Text>
      <TextInput
        placeholder="Code..."
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />
      <Pressable style={styles.button} onPress={onConfirm}>
        {!isPending ? (
          <Text style={styles.buttonText}>Confirm</Text>
        ) : (
          <ActivityIndicator />
        )}
      </Pressable>
    </View>
  );
};

export default Authenticate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontSize: 24,
    marginVertical: 5,
    color: 'gray',
  },
  error: {
    marginVertical: 5,
    color: 'red',
  },
  input: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#050A12',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
