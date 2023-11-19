import { PropsWithChildren, createContext, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from './config';

const TweetApiContext = createContext({});

export const TweetApiProvider = ({ children }: PropsWithChildren) => {
  const { authToken } = useAuth();
  const listTweets = async () => {
    if (!authToken) {
      return;
    }
    const res = await fetch(`${API_URL}/tweet`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.status === 401) {
      throw new Error('Not authorized. Please sign in');
    }
    if (res.status !== 200) {
      throw new Error('Error fetching tweets');
    }
    return await res.json();
  };

  const getTweet = async (id: string) => {
    const res = await fetch(`${API_URL}/tweet/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.status === 401) {
      throw new Error('Not authorized. Please sign in');
    }
    if (res.status !== 200) {
      throw new Error('Error fetching tweet');
    }
    return await res.json();
  };

  const createTweet = async (data: { content: string }) => {
    const res = await fetch(`${API_URL}/tweet`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status === 401) {
      throw new Error('Not authorized. Please sign in');
    }
    if (res.status !== 200) {
      throw new Error('Error creating the tweet');
    }
    return await res.json();
  };
  return (
    <TweetApiContext.Provider value={{ listTweets, getTweet, createTweet }}>
      {children}
    </TweetApiContext.Provider>
  );
};

export const useTweetApi = () => useContext(TweetApiContext);
