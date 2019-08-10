import React, { Component } from 'react';
import { Container, Row, Col as Column } from 'react-grid-system';
import Measure from './Measure';

const minMargins = { sm: 24, md: 24, lg: 64, xl: 64 };

export default class Overlay extends Component {

  renderColumns(numColumns = 12) {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push(<Column xs={1} sm={1} md={1} lg={1} xl={1}><div style={styles.columnFill}></div></Column>)
    }
    return columns;
  }

  render() {
    const { screenClass, fluid, gutterWidth, sidebar } = this.props;
    const margins = (fluid) ? `0 ${minMargins[screenClass] - gutterWidth/2}px` : 0;

    return (
      <div style={styles.overlay}>
        {(sidebar) ? <div style={styles.sideBar} /> : null }
        <div style={{ display: 'block', flex: 1, margin: margins }}>
          <Measure style={{ left: (sidebar) ? 92 : 0}} distance={minMargins[screenClass]} />
          <Measure style={{ right: 0}} distance={minMargins[screenClass]} />
          <Container fluid={fluid} style={styles.container}>
            <Row>
              {this.renderColumns()}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const styles = {
  overlay: {
    display: 'flex',
    position: 'fixed',
    zIndex: 5,
    top: 58,
    height: '100vh',
    width: '100%',
  },
  sideBar: {
    width: 92,
    backgroundColor: 'gray'
  },
  container: {
    
  },
  columnFill: {
    height: '100vh',
    backgroundColor: 'rgba(200, 100, 100, 0.2)'
  },
}