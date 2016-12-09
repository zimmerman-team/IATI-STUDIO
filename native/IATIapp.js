'use strict';

var Modal = require('react-native-modalbox');

import CheckBox from 'react-native-check-box';
import Spinner from 'react-native-loading-spinner-overlay';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import React from 'react';
import {
  AppRegistry,
  ListView,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image,
  Navigator,
  BackAndroid,
  Switch,
  Linking,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  NetInfo
} from 'react-native';

var nextPageUrl;
var projectDetails;
var countries = require('./countries.json');
var SectorsArray;
var ActivityArray;
var finished;
var signedIn = true;

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension: 100,
  springFriction: 1,
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});

//DetailScene
var DetailScene = React.createClass({
  getInitialState: function() {
    return {
      P_title: '',
      P_description: '',
      P_startDate: '',
      P_endDate: '',
      P_AstartDate: '',
      P_AendDate: '',
      P_recipientCountry: '',
      P_recipientRegion: '',
      P_sectors: [],
      P_estBudget: '',
      P_reportingOrg: '',
      P_status: '',
      P_IATIid: '',
      visible: false
    }
  },
  _handlePress() {
    this.props.navigator.pop();
  },

  componentWillMount() {
    this.loadJSONData("https://dev-post.oipa.nl/api/activities/" + this.props.Project_id + "/?format=json");
  },

  loadJSONData(url) {
    this.setState({
        visible: !this.state.visible
    });
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('a');
        this.setState({
          P_title: responseData.title.narratives[0].text,
          P_description: responseData.descriptions[0].narratives[0].text,
          //P_startDate: responseData.activity_dates[0].iso_date,
          //P_endDate: responseData.activity_dates[1].iso_date,
          P_sectors: responseData.sectors[0].sector.name,
          P_estBudget: responseData.aggregations.activity.budget_value,
          P_reportingOrg: responseData.reporting_organisations[0].narratives[0].text,
          //P_status: responseData.activity_status.name,
          P_IATIid: responseData.iati_identifier
        });

        if ( responseData.activity_status !== null ) {
          this.setState({
            P_status: responseData.activity_status.name,
          });
        } else {
          this.setState({
            P_status: "No data available",
          });
        }

        if ( (responseData.activity_dates).length > 0 ) {
          this.setState({
            P_startDate: responseData.activity_dates[0].iso_date,
          });
        } else {
          this.setState({
            P_startDate: "No data available",
          });
        }

        if ( (responseData.activity_dates).length > 1 ) {
          this.setState({
            P_endDate: responseData.activity_dates[1].iso_date,
          });
        } else {
          this.setState({
            P_endDate: "No data available",
          });
        }

        if ( (responseData.activity_dates).length > 2 ) {
          this.setState({
            P_AendDate: responseData.activity_dates[2].iso_date,
          });
        } else {
          this.setState({
            P_AendDate: "No data available",
          });
        }

        if ( (responseData.activity_dates).length > 3 ) {
          this.setState({
            P_AstartDate: responseData.activity_dates[3].iso_date,
          });
        } else {
          this.setState({
            P_AstartDate: "No data available",
          });
        }

        if ( (responseData.recipient_countries).length ) {
          this.setState({
            P_recipientCountry: responseData.recipient_countries[0].country.name,
          });
        } else {
          this.setState({
            P_recipientCountry: "No data available",
          });
        }

        if ( (responseData.recipient_regions).length ) {
          this.setState({
            P_recipientRegion: responseData.recipient_regions[0].region.name,
          });
        } else {
          this.setState({
            P_recipientRegion: "No data available",
          });
        }
        this.setState({
          visible: !this.state.visible
        });
      })
      .done();
  },

  back() {
    this.props.navigator.pop();
  },

  render() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.resetTo({id: 3,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/home.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 4}}>Home</Text>
            </TouchableOpacity>
          </View>
          <Image style={{height: 50, width: 50}} source={require('./img/a.png')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image style={{height: 30, width: 30}} source={require('./img/user.png')}/>
            <Text style={{fontSize: 9, paddingLeft: 3}}>Sign-in</Text>
          </View>
        </View>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => this.back()}>
            <Image style={{height: 25, width: 25}}  source={require('./img/back.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.state.P_title}</Text>
          <Image style={{height: 25, width: 25}}  source={require('./img/heart.png')}/>
        </View>
        <Spinner visible={this.state.visible} />
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Description:</Text> {this.state.P_description}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Planned Start Date:</Text> {this.state.P_startDate}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Planned End Date:</Text> {this.state.P_endDate}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Actual Start Date:</Text> {this.state.P_AstartDate}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Actual End Date:</Text> {this.state.P_AendDate}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Recipient Country:</Text> {this.state.P_recipientCountry}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Recipient Regions:</Text> {this.state.P_recipientRegion}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Sector:</Text> {this.state.P_sectors}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Budget:</Text> {this.state.P_estBudget}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Rep.Organisation:</Text> {this.state.P_reportingOrg}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>Status:</Text> {this.state.P_status}</Text>
        <Text style={styles.description}><Text style={{fontWeight: "bold"}}>IATI ID:</Text> {this.state.P_IATIid}</Text>
       </View>
    )
  },
});

//MainScene
var MainScene = React.createClass({
  getInitialState: function() {
    finished = false;
    nextPageUrl = 'https://dev-post.oipa.nl/api/activities/?format=json&page=2';
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      implChecked: false,
      compChecked: false,
      postChecked: false,
      visible: false,
      word: '',
    };
  },

  openModalFilters: function() {
    this.refs.modalFilters.open();
  },

  saveModalFilters: function() {
    let url = "https://dev-post.oipa.nl/api/activities/?format=json&activity_status="
    if (this.state.implChecked) {
      url = url + '2,'
    }
    if (this.state.compChecked) {
      url = url + '3,'
    }
    if (this.state.postChecked) {
      url = url + '4,'
    }
    this.loadJSONData(url);
    this.closeModalFilters();
  },

  closeModalFilters() {
    this.refs.modalFilters.close();
  },

  _handlePress() {
    this.props.navigator.push({id: 2,});
  },

  componentDidMount() {
    if (this.props.country_codes) {
      this.loadJSONData("https://dev-post.oipa.nl/api/activities/?format=json&recipient_country=" + this.props.country_codes);
    } else {
      this.loadJSONData("https://dev-post.oipa.nl/api/activities/?format=json");
    }
  },

  back() {
    this.props.navigator.pop();
  },

  render: function() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.resetTo({id: 3,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/home.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 4}}>Home</Text>
            </TouchableOpacity>
          </View>
          <Image style={{height: 50, width: 50}} source={require('./img/a.png')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id:4,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/user.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 3}}>Sign-in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => this.back()}>
            <Image style={{height: 25, width: 25, marginTop: 7}}  source={require('./img/back.png')}/>
          </TouchableOpacity>
          <TextInput
            returnKeyType='done'
            style={{width: 250, height: 35, borderColor: 'gray', borderWidth: 1}}
            placeholder={'Search IATI data'}
            value={this.state.word}
            onChangeText={(param) => this.setState({word: param})}
            onSubmitEditing={() => this.loadJSONData("https://dev-post.oipa.nl/api/activities/?format=json&q=" + this.state.word)}
          />
          <TouchableOpacity onPress={() => this.props.navigator.push({id: 5,})}>
            <Text style={{fontSize: 14, textDecorationLine: 'underline', marginTop: 9}}>Filter</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.state.visible} />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          scrollEnabled={true}
          enableEmptySections={true}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          onEndReached={() => this._loadMoreContentAsync()}
        />
        {/* <View style={styles.footer}>
          <Text style={styles.filters} onPress={() => this.openModalFilters()}>Filters</Text>
        </View> */}
        <Modal style={styles.modal} ref={"modalFilters"} position={"center"}>
          <Text style={styles.title}>Filters</Text>
          <Text style={styles.subtitle}>Activity status</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ flex: 1 }}>Implementation</Text>
            <Switch
              onValueChange={(value) => this.setState({implChecked: value})}
              style={{marginBottom: 10, flex: 1}}
              value={this.state.implChecked} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ flex: 1}}>Completion</Text>
            <Switch
              onValueChange={(value) => this.setState({compChecked: value})}
              style={{marginBottom: 10, flex: 1}}
              value={this.state.compChecked} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ flex: 1}}>Post-completion</Text>
            <Switch
              onValueChange={(value) => this.setState({postChecked: value})}
              style={{marginBottom: 10, flex: 1}}
              value={this.state.postChecked} />
          </View>
          <Button style={styles.modalBtn} onPress={() => this.saveModalFilters()} title="Save"/>
        </Modal>
      </View>
    );
  },

  btnPressed: function(Project_id) {
    this.props.navigator.push({id: 2, passProps: {Project_id}});
  },

  renderRow: function(rowData) {
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => this.btnPressed(rowData.iati_identifier)}>
          <Text style={styles.title}>{rowData.title.narratives[0].text}</Text>
        </TouchableOpacity>
      </View>
    );
  },

  loadJSONData(url) {
    this.setState({
        visible: !this.state.visible
    });
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        ActivityArray = responseData.results;
        this.setState({dataSource: this.state.dataSource.cloneWithRows(ActivityArray)});
        if (responseData.next) {
          nextPageUrl = responseData.next;
        }
        this.setState({
          visible: !this.state.visible
        });
      })
      .done();
  },

  _loadMoreContentAsync() {
    if (!finished) {
      fetch(nextPageUrl)
        .then((response) => response.json())
        .then((responseData) => {
          ActivityArray = ActivityArray.concat(responseData.results);
          var ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({dataSource: ds2.cloneWithRows(ActivityArray)});
          if (responseData.next) {
            nextPageUrl = responseData.next;
          }
        })
        .done();
    }
  },
});

//FilterScene
var FilterScene = React.createClass({
  getInitialState: function() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['Activities', 'Countries', 'Sectors']),
    };
  },

  componentDidMount(){

  },

  back() {
    this.props.navigator.pop();
  },

  render: function() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.resetTo({id: 3,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/home.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 4}}>Home</Text>
            </TouchableOpacity>
          </View>
          <Image style={{height: 50, width: 50}} source={require('./img/a.png')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id:4,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/user.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 3}}>Sign-in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => this.back()}>
            <Image style={{height: 25, width: 25}}  source={require('./img/back.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 2}}>Filters</Text>
          <Text style={{fontSize: 14, marginTop: 3}}>Save</Text>
        </View>
        <Spinner visible={this.state.visible} />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          scrollEnabled={true}
          enableEmptySections={true}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  },

  rowPressed: function(pID) {
    switch (pID) {
      case 'Activities':
        this.props.navigator.pop();
        break;
      case 'Countries':
        this.props.navigator.push({id: 6,});
        break;
      case 'Sectors':
        this.props.navigator.push({id: 7,});
        break;
      default:

    }
  },

  renderRow: function(rowData) {
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => this.rowPressed(rowData)}>
          <Text style={styles.title}>{rowData}</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

//CountriesScene
var CountriesScene = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
    };
  },

  componentDidMount(){
    this.setState({dataSource: this.state.dataSource.cloneWithRows(countries)});
  },

  back() {
    this.props.navigator.pop();
  },

  render: function() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.resetTo({id: 3,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/home.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 4}}>Home</Text>
            </TouchableOpacity>
          </View>
          <Image style={{height: 50, width: 50}} source={require('./img/a.png')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id:4,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/user.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 3}}>Sign-in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => this.back()}>
            <Image style={{height: 25, width: 25}}  source={require('./img/back.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 2}}>Countries</Text>
          <TouchableOpacity onPress={() => this.saveClicked()}>
            <Text style={{fontSize: 14, marginTop: 3}}>Save</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.state.visible} />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          scrollEnabled={true}
          enableEmptySections={true}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  },

  saveClicked() {
    var country_codes = [];
    if (signedIn) {
      for (var i = 0; i < countries.length; i++) {
        if (countries[i].selected) {
          country_codes = country_codes + countries[i].code + ",";
        }
      }
      this.props.navigator.push({id: 1, passProps: {country_codes}});
    } else {
      this.props.navigator.push({id: 4,});
    }
  },

  rowPressed: function(pID, rID) {
    let newArray = countries.slice();

    newArray[rID].selected = !(newArray[rID].selected);

    var newDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.setState({dataSource: newDs.cloneWithRows(newArray)});
  },

  renderRow: function(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity onPress={() => this.rowPressed(rowData, rowID)}>
        <View style={{flex: 1, paddingVertical: 8, margin: 10, marginTop: 5, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{rowData.name}</Text>
          <Image style={{height: 25, width: 25}} source={rowData.selected ? require('./img/check.png') : require('./img/empty.png')}/>
        </View>
      </TouchableOpacity>
    );
  }
});

//SectorScene
var SectorScene = React.createClass({
  getInitialState: function() {
    finished = false;
    nextPageUrl = 'https://dev-post.oipa.nl/api/sectors/?format=json&page=2';
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([])
    };
  },

  componentDidMount(){
    this.loadJSONData("https://dev-post.oipa.nl/api/sectors/?format=json");
  },

  back() {
    this.props.navigator.pop();
  },

  render: function() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.resetTo({id: 3,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/home.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 4}}>Home</Text>
            </TouchableOpacity>
          </View>
          <Image style={{height: 50, width: 50}} source={require('./img/a.png')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id:4,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/user.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 3}}>Sign-in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subHeader}>
          <TouchableOpacity onPress={() => this.back()}>
            <Image style={{height: 25, width: 25}}  source={require('./img/back.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Sectors</Text>
          <Text style={{fontSize: 14}}>Save</Text>
        </View>
        <Spinner visible={this.state.visible} />
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          scrollEnabled={true}
          enableEmptySections={true}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          onEndReached={() => this._loadMoreContentAsync()}
        />
      </View>
    );
  },

  _loadMoreContentAsync() {
    if (!finished) {
      fetch(nextPageUrl)
        .then((response) => response.json())
        .then((responseData) => {
          SectorsArray = SectorsArray.concat(responseData.results);
          var ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({dataSource: ds2.cloneWithRows(SectorsArray)});
          if (responseData.next) {
            nextPageUrl = responseData.next;
          }
        })
        .done();
    }
  },

  renderRow: function(rowData) {
    return (
      <View style={styles.row}>
        <TouchableOpacity>
          <Text style={styles.title}>{rowData.name}</Text>
        </TouchableOpacity>
      </View>
    );
  },

  loadJSONData(url) {
    this.setState({
        visible: !this.state.visible
    });
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        SectorsArray = responseData.results;
        this.setState({dataSource: this.state.dataSource.cloneWithRows(SectorsArray)});
        if (responseData.next) {
          nextPageUrl = responseData.next;
        } else {
          finished = true;
        }
        this.setState({
          visible: !this.state.visible
        });
      })
    .done();
  },
});

//StartScene
var StartScene = React.createClass({
  getInitialState: function() {
    return {
      search_text: '',
    };
  },

  render: function() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image style={{height: 30, width: 30}} source={require('./img/home.png')}/>
            <Text style={{fontSize: 9, paddingLeft: 4}}>Home</Text>
          </View>
          <Image style={{height: 50, width: 50}} source={require('./img/a.png')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.push({id: 4,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/user.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 3}}>Sign-in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.goNextScene()}>
        <View style={{flexDirection: 'row',
                      backgroundColor: '#eaeaea',
                      padding: 10,
                      justifyContent: 'center'}}>

            <Image style={{height: 25, width: 25}} source={require('image!search')}/>
            <Text style={{fontSize: 15, fontWeight: 'bold', paddingLeft: 5}}>Start exploring IATI data</Text>

        </View>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'column', marginTop: 100, justifyContent: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={require('./img/cool.png')}/>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.filters} onPress={() => this.openWebsite()}>powered by Zimmerman&Zimmerman®</Text>
        </View>
      </View>
    );
  },

  goNextScene() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.navigator.push({id: 1,});
      } else {
        Alert.alert('Internet Connection', 'There is no Internet Connection. Check your connection and try again!', [{text: 'OK'}]);
      }
    });
  },

  openWebsite() {
    Linking.openURL("https://www.zimmermanzimmerman.nl/").catch(err => console.error('An error occurred', err));
  }
});

//SignInScene
var SignInScene = React.createClass({
  render: function() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigator.resetTo({id: 3,})}>
              <Image style={{height: 30, width: 30}} source={require('./img/home.png')}/>
              <Text style={{fontSize: 9, paddingLeft: 4}}>Home</Text>
            </TouchableOpacity>
          </View>
          <Image style={{height: 50, width: 50}} source={require('./img/a.png')}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Image style={{height: 30, width: 30}} source={require('./img/user.png')}/>
            <Text style={{fontSize: 9}}>Sign-in</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row',
                      backgroundColor: '#eaeaea',
                      padding: 10,
                      justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.back()}>
            <Image style={{height: 25, width: 25}}  source={require('./img/back.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Sign-in</Text>
          <Text></Text>
        </View>
        <View style={styles.centeredContainer}>
          <Text style={{margin: 20, textAlign: 'center', fontSize: 15, width: 200}}>Sign in and keep track of your favourite IATI activities and Charts</Text>
          <Image style={{height: 100, width: 100}} source={require('./img/a.png')}/>
          <TextInput placeholder='Enter your username' style={{width: 250, height: 35, borderColor: 'gray', borderWidth: 0.5}}/>
          <TextInput placeholder='Enter your password' style={{width: 250, height: 35, borderColor: 'gray', borderWidth: 0.5}}/>
          <View style={{borderRadius: 10, borderWidth: 1, backgroundColor: '#ff3d3d', borderColor: '#ff3d3d'}}>
            <TouchableOpacity style={{width: 200, height: 32, paddingLeft: 75}} onPress={this.btnSignIn}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <Text>OR</Text>
          <View style={{borderRadius: 10, borderWidth: 1, backgroundColor: '#f76816', marginBottom: 10, borderColor: '#ff3d3d'}}>
            <TouchableOpacity style={{width: 200, height: 32, paddingLeft: 75}} onPress={this.btnJoin}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },

  back() {
    this.props.navigator.pop();
  },

  btnSignIn() {

  },

  btnJoin() {

  },
});

var IATIapp = React.createClass({
  _renderScene(route, navigator) {
    if (route.id === 1) {
      return <MainScene navigator={navigator} {...route.passProps} />
    } else if (route.id === 2) {
      return <DetailScene navigator={navigator} {...route.passProps} />
    } else if (route.id === 3) {
      return <StartScene navigator={navigator} />
    } else if (route.id === 4) {
      return <SignInScene navigator={navigator} />
    } else if (route.id === 5) {
      return <FilterScene navigator={navigator} />
    } else if (route.id === 6) {
      return <CountriesScene navigator={navigator} />
    } else if (route.id === 7) {
      return <SectorScene navigator={navigator} />
    }
  },

  _configureScene(route) {
    return CustomSceneConfig;
  },

  render() {
    return (
      <Navigator
        initialRoute={{id: 3, }}
        renderScene={this._renderScene}
        configureScene={this._configureScene} />
    );
  }
});

var styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0
  },
  centeredContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  list: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'darkgrey',
  },
  row: {
    flex: 1,
    paddingVertical: 8,
    margin: 10,
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: '#333333',
    margin: 0,
  },
  description: {
    fontSize: 15,
    textAlign: 'left',
    color: 'grey',
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'space-between'
  },
  subHeader: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    padding: 10,
    justifyContent: 'space-between'
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    padding: 10
  },
  filters: {
    textAlign:'center',
    flex:1,
    color: 'white'
  },
  pageBtns: {
    color: 'white'
  },
  projectTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    margin: 10,
    fontWeight: 'bold'
  },
  modal: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    height: 300,
    width: 250
  },
  modalBtn: {
    width: 50
  },
  subtitle: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  }
});

module.exports = IATIapp;
//AppRegistry.registerComponent('IATIapp', () => IATIapp);
