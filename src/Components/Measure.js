import React, { Component } from 'react';


export default class Measure extends Component {
  render() {
    const { distance, style } = this.props;

    return (
      <div style={{ ...styles.container, ...style, width: `${distance}px` }}>
        <p style={styles.text}>{distance}</p>
        <div style={styles.drawing}>
          <div style={{ width: 2, height: 24, backgroundColor: 'red' }} />
          <div style={{ flex: 1, height: 2, backgroundColor: 'red' }} />
          <div style={{ width: 2, height: 24, backgroundColor: 'red' }} />
        </div>

      </div>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: '25%',
  },
  drawing: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    width: '100%',
    top: 0,
    textAlign: 'center',
    color: 'red',
  }
};
