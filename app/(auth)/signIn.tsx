import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../../lib/api/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
  });
  const onSignIn = async () => {
    try {
      await mutateAsync({
        email,
      });
      router.push({ pathname: '/authenticate', params: { email } });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sign in or create an account</Text>
      <TextInput
        placeholder="Email..."
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Pressable style={styles.button} onPress={onSignIn}>
        {!isPending ? (
          <Text style={styles.buttonText}>Sign In</Text>
        ) : (
          <ActivityIndicator />
        )}
      </Pressable>
    </View>
  );
};

export default SignIn;

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
