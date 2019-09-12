import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { navPropTypes } from '../propTypes';


class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    this.listener1 = this.props.navigation.addListener(
      'willBlur',
      () => this.camera.pausePreview()
    );

    this.listener2 = this.props.navigation.addListener(
      'willFocus',
      () => this.camera.resumePreview()
    );
  }

  componentWillUnmound() {
    this.listener1.remove();
    this.listener2.remove();
  }

  flip() {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  }

  toggleFlash() {
    this.setState({
      flash: !this.state.flash
    });
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    const { hasCameraPermission } = this.state;

    if(hasCameraPermission === null) {
      return(
        <View style={styles.noCameraWrap}/>
      );
    }

    if(hasCameraPermission === false) {
      return(
        <View style={styles.noCameraWrap}>
          <Text style={{color: '#fff'}}>No access to camera</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={ref => this.camera = ref}
          flashMode={Camera.Constants.FlashMode[this.state.flash ? 'torch' : 'off']}
        >
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.cameraControlsTop}>
              <TouchableOpacity onPress={this.goBack.bind(this)}>
                <MaterialIcons name='close' color='rgba(255,255,255,0.6)' size={30}/>
              </TouchableOpacity>
              <View style={{flex: 1}}/>
              <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
                <MaterialIcons name={this.state.flash ? 'flash-on' : 'flash-off'} color='rgba(255,255,255,0.6)' size={30}/>
              </TouchableOpacity>
            </View>

            <View style={styles.cameraControlsBottom}>
              <View style={styles.centerItems}>
                <MaterialIcons color='rgba(255,255,255,0.6)' name='photo' size={30}/>
              </View>
              <View style={styles.centerItems}>
                <TouchableOpacity style={styles.shutter}>
                </TouchableOpacity>
              </View>
              <View style={styles.centerItems}>
                <TouchableOpacity onPress={this.flip.bind(this)}>
                  <MaterialIcons color='rgba(255,255,255,0.6)' name='loop' size={30}/>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Camera>
      </View>
    );
  }
}

CameraScreen.propTypes = {
  ...navPropTypes
};

const styles = StyleSheet.create({

  noCameraWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#000'
  },

  shutter: {
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.6)',
    height: 80,
    width: 80,
    borderRadius: 100
  },

  cameraControlsTop: {
    flex: 1,
    padding: '5%',
    paddingTop: 0,
    flexDirection: 'row'
  },

  cameraControlsBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },

  centerItems: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

export default CameraScreen;
