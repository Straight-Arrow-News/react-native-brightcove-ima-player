import React, { Component } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewProps,
  findNodeHandle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-brightcove-ima-player' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type TBrightcoveIMAPlayerSettings = {
  IMAUrl: string;
  autoAdvance?: boolean;
  autoPlay?: boolean;
  allowsExternalPlayback?: boolean;
};
/*
removed:
referenceId: PropTypes.string,
videoToken: PropTypes.string,
added:
adVideoLoadTimeout?: number;
 */
type BrightcoveIMAPlayerProps = ViewProps & {
  accountId: string;
  policyKey: string;
  videoId: string;
  settings: TBrightcoveIMAPlayerSettings;
  autoPlay?: boolean;
  play?: boolean;
  fullscreen?: boolean;
  disableDefaultControl?: boolean;
  volume?: number;
  bitRate?: number;
  /**
   * Ad Video Load Timeout in milliseconds, default is 3000.
   */
  adVideoLoadTimeout?: number;
  playbackRate?: number;
  onReady?: () => {};
  onPlay?: () => {};
  onPause?: () => {};
  onEnd?: () => {};
  onProgress?: () => {};
  onChangeDuration?: () => {};
  onUpdateBufferProgress?: () => {};
  onEnterFullscreen?: () => {};
  onExitFullscreen?: () => {};
};

const ComponentName = 'BrightcoveIMAPlayerView';

const BrightcoveIMAPlayerView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<BrightcoveIMAPlayerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export class BrightcoveIMAPlayer extends Component<BrightcoveIMAPlayerProps> {
  // private _root: React.RefObject<BrightcoveIMAPlayer> = React.createRef();

  componentWillUnmount = () => {
    if (Platform.OS === 'ios') {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.getViewManagerConfig(ComponentName).Commands.dispose,
        []
      );
    }
  };

  seekTo = (seconds: number) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig(ComponentName).Commands.seekTo,
      [seconds]
    );
  };

  toggleFullscreen = (isFullscreen: boolean) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig(ComponentName).Commands.toggleFullscreen,
      [isFullscreen]
    );
  };

  stopPlayback = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig(ComponentName).Commands.stopPlayback,
      []
    );
  };

  play = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig(ComponentName).Commands.play,
      []
    );
  };

  pause = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig(ComponentName).Commands.pause,
      []
    );
  };

  render() {
    return (
      <BrightcoveIMAPlayerView
        // ref={(e: React.RefObject<BrightcoveIMAPlayer>) => (this._root = e)}
        {...this.props}
      />
    );
  }
}
