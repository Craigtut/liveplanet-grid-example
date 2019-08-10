import React, { Component } from 'react';
import { setConfiguration, ScreenClassRender, Container, Row, Col as Column } from 'react-grid-system';


import Overlay from '../Components/Overlay';


const breakpoints = Object.values({ sm: 320, md: 600, lg: 1024, xl: 1440 });
const minMargins = { sm: 24, md: 24, lg: 64, xl: 64 };
const grid = { xs: 4, sm: 4, md: 8, lg: 12, xl: 12 };

export default class Grid extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(props.location.search);

    this.state = {
      screenClass: 'lg',
      gutterWidth: searchParams.get('gutterWidth') || 16,
      withSideMenu: searchParams.get('sideMenu') === '1',
      fluid: searchParams.get('fluid') === '1',
      showOverlay: searchParams.get('overlay') === '1',
    }
    
    this.updateScreenClass = this.updateScreenClass.bind(this);
  }

  updateScreenClass(screenClass) {
    if (this.state.screenClass !== screenClass) {
      this.setState({ screenClass });
    }
  }

  renderHeader() {
    const { screenClass, fluid, withSideMenu, gutterWidth } = this.state;
  
    const nameMap = {
      xs: 'Mobile',
      sm: 'Mobile',
      md: 'Tablet',
      lg: 'Laptop',
      xl: 'Desktop',
    }
    return (
      <div style={styles.header}>
        {`${nameMap[screenClass]}, ${grid[screenClass]} columns`}
      </div>
    );
  }

  render() {
    const { screenClass, gutterWidth, withSideMenu, fluid, showOverlay } = this.state;
  
    const containerWidths = (() => breakpoints.map((breakpoint, i) => breakpoint - (Object.values(minMargins)[i] * 2) + gutterWidth))();
    const configureGrid = (screenClass) => {
      setConfiguration({ gridColumns: grid[screenClass], gutterWidth, breakpoints, containerWidths });
    }
  
    const margins = (fluid) ? `0 ${minMargins[screenClass] - gutterWidth/2}px` : 0;
    const shouldHaveMenu = (withSideMenu && screenClass !== 'sm' && screenClass !== 'xs');
    return (
      <div className="App" style={styles.appContainer}>
        <ScreenClassRender render={screenClass => configureGrid(screenClass)} />
        <ScreenClassRender render={this.updateScreenClass} />

        {this.renderHeader()}
      
        {(shouldHaveMenu) ? <div style={styles.sideBar} /> : null }

        <div style={{ display: 'block', flex: 1, margin: margins }}>
          <Container fluid={fluid} style={{ position: 'relative', zIndex: 0, marginTop: 58 }}>
            <Row style={styles.row}>
              <Column md={4} lg={3} style={styles.column}>
                <div style={styles.card}>Column</div>
              </Column>
              <Column md={4} lg={3} style={styles.column}>
                <div style={styles.card}>Column</div>
              </Column>
              <Column md={4} lg={3} style={styles.column}>
                <div style={styles.card}>Column</div>
              </Column>
              <Column md={4} lg={3} style={styles.column}>
                <div style={styles.card}>Column</div>
              </Column>
            </Row>
            <Row style={styles.row}>
            <Column style={styles.column}>
              <div style={styles.card}>Column</div>
            </Column>
            <Column style={styles.column}>
              <div style={styles.card}>Column</div>
            </Column>
          </Row>
          </Container>
        </div>
        {(showOverlay) ? <Overlay fluid={fluid} sidebar={shouldHaveMenu} screenClass={screenClass} gutterWidth={gutterWidth} /> : null }
      </div>
    );
  }
}

const styles = {
  appContainer: {
    display: 'flex',
    backgroundColor: '#eee',
    minHeight: '100vh',
    flexDirection: 'row',
  },
  sideBar: {
    width: 92,
    backgroundColor: 'gray'
  },
  header: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  row: {
    paddingTop: 32,
  },
  column: {
    marginBottom: 32,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  }
}
