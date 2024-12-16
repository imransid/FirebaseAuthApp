import React, {useRef} from 'react';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import {WebView} from 'react-native-webview';
type VideoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VideoScreen'
>;

type VideoScreenRouteProp = RouteProp<RootStackParamList, 'VideoScreen'>;

const VideoScreen: FC = () => {
  const route = useRoute<VideoScreenRouteProp>();
  const {videoURL} = route.params;
  const videoRef = useRef<VideoRef>(null);

  if (!videoURL) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 16, color: '#888888', fontWeight: '600'}}>
          No video URL provided.
        </Text>
      </View>
    );
  }

  return (
    <WebView
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{uri: videoURL}}
    />
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    height: 200,
    width: 400,
  },
});

export default VideoScreen;
