import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native';
import Tweet from '../../../../../components/Tweet';
import { useTweetApi } from '../../../../../lib/api/tweets';

export default function TweetScreen() {
  const { getTweet } = useTweetApi();
  const { id } = useSearchParams();
  const {
    data: tweet,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tweet', id],
    queryFn: () => getTweet(id as string),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Tweet {id} not found</Text>;
  }

  if (!tweet) {
    return <Text>Tweet {id} not found!</Text>;
  }

  return <Tweet tweet={tweet} />;
}
