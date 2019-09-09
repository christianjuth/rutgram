## Functional vs Class Component

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// vs

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

**Why should I use functional components?**
1. Functional component are much easier to read and test because they are plain JavaScript functions without state or lifecycle-hooks
2. You end up with less code
3. The React team mentioned that there may be a performance boost for functional component in future React versions

_As of react 16.8 functional components have access to state and lifecycle hooks_

Source: https://medium.com/@Zwenza/functional-vs-class-components-in-react-231e3fbd7108

## Styling Components

##### Inline styles

```javascript
function App() {
  return(
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      padding: 10
    }}>
  );
};
```

Many people prefer to keep their styles outside of their render function.

##### StyleSheet
```javascript
function App() {
  return(
    <View style={styles.container}>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
});
```

[_Render time comparison for styling methods_](https://github.com/brunolemos/react-native-css-in-js-benchmarks/blob/master/RESULTS.md)

##### Styling using a wrapper component
_Note: this is different from a `styled-component`_

```javascript
// file: components/StyledButton.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default (props) => {
  return(
    <Button
      mode='contained'
      {...props}
      dark={true}
      color={props.mode !== 'outlined' ? '#3798f0' : '#000'}
      style={[styles.noShadow, props.style]}
      uppercase={false}
    >{props.children}</Button>
  );
};

const styles = StyleSheet.create({
  noShadow: {
    elevation: 0
  }
});
```


## Conditional Rendering

##### Inline

```javascript
import { Platform, View, StatusBar } from 'react-native';

function App() {
  return(
    <View>
      {Platform.OS === 'ios' ? <StatusBar barStyle="light-content"/> : null}
    </View>
  );
}
```

##### Render functions can return null

```javascript
import React from 'react';
import { Platform, View, StatusBar } from 'react-native';

class AdaptiveBarWrap extends React.Component {
  render() {
    if(Platform.OS === 'ios')
      return(<StatusBar barStyle="light-content"/>);
    else
      return null;
  }
}

function App() {
  return(
    <View>
      <AdaptiveBarWrap/>
    </View>
  );
}
```

or, as a function component

```javascript
function AdaptiveBarWrap() {
  if(Platform.OS === 'ios')
    return(<StatusBar barStyle="light-content"/>);
  else
    return null;
}
```

> Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods. For instance componentDidUpdate will still be called.
