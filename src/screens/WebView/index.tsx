import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const IELTSWebView = () => {
  return (
    <WebView
      source={{ uri: "https://practicepteonline.com/cambridge-ielts-1-13-tests/" }}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator size="large" color="blue" />}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      scalesPageToFit={true}
    />
  );
};

export default IELTSWebView;
