import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {API_URL, IMG_URL} from '@env';
import Loader from '../components/common/Loader';
export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      mobile: '',
      // password: '',
      loader: false,
    };
  }

  loginHandler = async () => {
    const {mobile} = this.state;
    const data = {
      mobile,
      password: mobile,
    };
    await axios({
      method: 'post',
      data,
      url: `${`${API_URL}/users/login`}`,
    })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.setState({
          loader: false,
        });
        this.props.navigation.goBack();
      })
      .catch((err) => {
        console.log('Error : ' + JSON.stringify(err.response.data));
        this.setState({
          loader: false,
        });
      });
  };

  registerHandler = async () => {
    const {name, mobile} = this.state;
    if (name.length < 3) {
      alert('Please provide  at least three character long name');
      return;
    }

    if (!(mobile.length === 10)) {
      alert('Please provide  10 digit mobile number');
      return;
    }

    if (isNaN(mobile)) {
      alert('Only digits allow');
      return;
    }

    this.setState({
      loader: true,
    });
    const data = {
      name,
      mobile,
      password: mobile,
    };
    await axios({
      method: 'post',
      data,
      url: `${`${API_URL}/users`}`,
    })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.setState({
          loader: false,
        });
        this.props.navigation.goBack();
      })
      .catch((err) => {
        console.log('Error : ' + JSON.stringify(err.response.data));
        this.setState({
          loader: false,
        });
        if (err.response.data.message === 'User already exist!') {
          this.setState({
            loader: true,
          });
          this.loginHandler();
        }
      });
  };

  render() {
    return (
      <ScrollView style={(styles.container, {padding: 20})}>
        <Text style={{fontSize: 24, fontWeight: '700', marginTop: 5}}>
          Please Fill Your
          <Text style={{color: '#E56924'}}> Details</Text>
        </Text>
        <View style={{paddingVertical: 30}}>
          <View>
            <Text style={styles.textInputTitle}>Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => this.setState({name: value})}
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text style={styles.textInputTitle}>Mobile Number</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(value) => this.setState({mobile: value})}
              placeholder="Enter your mobile number"
              keyboardType="number-pad"
            />
          </View>

          {/* <View>
            <Text style={styles.textInputTitle}>Password</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              onChangeText={(value) => this.setState({password: value})}
              placeholder="Password"
              keyboardType="mobile-address"
            />
          </View> */}

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {this.state.loader ? (
              <Loader />
            ) : (
              <TouchableOpacity
                onPress={() => this.registerHandler()}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 40,
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: '#E56924',
                  backgroundColor: '#E56924',
                  marginTop: 20,
                }}>
                <Text style={{color: '#fff', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#E56924',
              paddingBottom: 20,
            }}>
            Or
          </Text>

          <Text>
            Already have an account yet?{' '}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{color: '#E56924'}}>Login here.</Text>
            </TouchableOpacity>
          </Text>
        </View> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  textInputTitle: {
    fontSize: 18,
    paddingBottom: 4,
    paddingLeft: 2,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d7d9d7',
    padding: 7,
    marginBottom: 12,
    borderRadius: 10,
    paddingLeft: 16,
  },
});