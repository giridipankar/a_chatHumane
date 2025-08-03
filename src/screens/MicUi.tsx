import {
  Alert,
  Linking,
  Permission,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  RecordBackType,
  PlayBackType,
  PlaybackEndType,
  AudioSet,
  AVEncoderAudioQualityIOSType,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import React, { use, useEffect, useState } from 'react';
import { AppIcon } from '../components/AppIcon';
import getAudioPermissions from './utils/GetPermissions';

export default function MicUi() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recordingState, setRecordingState] = useState({
    recordSecs: 0,
    recordTime: '00:00',
    currentMetering: 0, // Initialize currentMetering
  });
  const [playerState, setPlayerState] = useState({
    currentPosition: 0,
    totalDuration: 0,
    playTime: '00:00',
    duration: '00:00',
  });
  const [audioPath, setAudioPath] = useState('');

  useEffect(() => {
    if (isListening) {
      // Start recording when listening is enabled
      onStartRecord();
    } else {
      // Stop recording when listening is disabled
      onStopRecord();
      // setRecordingState({
      //   ...recordingState,
      //   recordSecs: 0,
      //   recordTime: '00:00',
      // });
      // console.log('>>>Recording stopped', audioPath);
      // setIsPlaying(true);
    }
  }, [isListening]);

  useEffect(() => {
    if (isPlaying) {
      // Start playback when isPlaying is true
      onStartPlay(audioPath);
    } else {
      onStopPlay();
    }
  }, [isPlaying, audioPath]);

  //clean up listeners when component unmounts
  useEffect(() => {
    return () => {
      AudioRecorderPlayer.removeRecordBackListener();
      AudioRecorderPlayer.removePlayBackListener();
      AudioRecorderPlayer.removePlaybackEndListener();
    };
  }, []);

  // AudioRecorderPlayer is a singleton instance, use directly

  const audioSet: AudioSet = {
    // iOS Settings
    AVSampleRateKeyIOS: 44100,
    AVFormatIDKeyIOS: 'aac',
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,

    // Android Settings
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
  };

  const meteringEnabled = true; // Enable audio metering

  // Recording
  const onStartRecord = async () => {
    // Set up recording progress listener
    AudioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.log(
        '>>>Recording progress:',
        e.currentMetering,
        // e.currentPosition,
        e.recordSecs,
      );
      setRecordingState({
        ...recordingState,
        recordSecs: e.recordSecs || e.currentPosition,
        recordTime: AudioRecorderPlayer.mmssss(
          Math.floor(e.recordSecs || e.currentPosition),
        ),
        currentMetering: e.currentMetering || 0, // Handle undefined currentMetering
      });
    });

    const result = await AudioRecorderPlayer.startRecorder(
      undefined, // Use default path
      audioSet,
      true, // Enable metering
    );
    console.log('Recording started:', result);
    setAudioPath(result);
  };

  const onStopRecord = async () => {
    const result = await AudioRecorderPlayer.stopRecorder();
    AudioRecorderPlayer.removeRecordBackListener();
    setIsPlaying(true); // Set isPlaying to true to start playback
    console.log('Recording stopped:', result);
  };

  // Pause/Resume Recording
  const onPauseRecord = async () => {
    await AudioRecorderPlayer.pauseRecorder();
    console.log('Recording paused');
  };

  const onResumeRecord = async () => {
    await AudioRecorderPlayer.resumeRecorder();
    console.log('Recording resumed');
  };

  // Playback
  const onStartPlay = async (audioPath: string) => {
    // Set up playback progress listener
    AudioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      console.log('Playback progress:', e.currentPosition, e.duration);
      setPlayerState({
        ...playerState,
        currentPosition: e.currentPosition,
        totalDuration: e.duration,
        playTime: AudioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: AudioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });

    // Set up playback end listener
    AudioRecorderPlayer.addPlaybackEndListener((e: PlaybackEndType) => {
      console.log('Playback completed:', e);
      // Handle playback completion
      setIsPlaying(false);
      setPlayerState({
        currentPosition: 0,
        totalDuration: 0,
        playTime: '00:00',
        duration: '00:00',
      });
      AudioRecorderPlayer.removePlayBackListener();
      AudioRecorderPlayer.removePlaybackEndListener();
    });

    const result = await AudioRecorderPlayer.startPlayer(audioPath);
    console.log('Playback started:', result);
  };

  const onPausePlay = async () => {
    await AudioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    AudioRecorderPlayer.stopPlayer();
    AudioRecorderPlayer.removePlayBackListener();
    AudioRecorderPlayer.removePlaybackEndListener();
  };

  return (
    <TouchableOpacity
      onPress={() => {
        // Handle icon press
        if (!isListening) {
          getAudioPermissions().then(granted => {
            if (granted) {
              setIsListening(true);
              // Start listening logic here
            } else {
              console.warn('Audio permissions not granted');
              // Optionally, you can show an alert to the user
              Alert.alert(
                'Permission Required',
                'Please grant audio permissions to use this feature.',
                [
                  {
                    text: 'Navigate to Settings',
                    onPress: () => {
                      Linking.openSettings();
                    },
                  },
                ],
                { cancelable: true, userInterfaceStyle: 'light' },
              );
            }
          });
        } else {
          // Stop listening logic here
          setIsListening(false);
        }
        console.log('Icon pressed');
      }}
    >
      {/* Replace with your desired icon type and name */}
      {isPlaying ? (
        <AppIcon type="MaterialIcons" name="blur-on" size={70} color={'blue'} />
      ) : (
        <AppIcon
          type="MaterialIcons"
          name="mic"
          size={50}
          color={isListening ? 'blue' : 'black'}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
