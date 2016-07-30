
import  React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    ListView
} from 'react-native';


var data = [
  {
    "id": 1,
    "profile_picture": {
      "href": "//img.naver.net/static/newsstand/up/2016/0311/nsd10128574.gif"
    }
  },
  {
    "id": 2,
    "profile_picture": {
      "href": "//img.naver.net/static/newsstand/up/2015/0424/nsd163650137.gif"
    }
  },
  {
    "id": 3,
    "profile_picture": {
      "href": "http://img.naver.net/static/newsstand/up/2014/0715/139.gif"
    }
  },
  {
    "id": 4,
    "profile_picture": {
      "href": "//like1.r.worldssl.net/ui_big/1305634.jpg"
    }
  },
  {
    "id": 5,
    "profile_picture": {
      "href": "//like1.r.worldssl.net/ui_big/1305634.jpg"
    }
  },
  {
    "id": 6,
    "profile_picture": {
      "href": "//like1.r.worldssl.net/ui_big/1305634.jpg"
    }
  }

];

var InfiniteListView = React.createClass({

  getInitialState: function () {
    return {
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  },
  componentDidMount: function () {
    this._data = [];
    this.setState({
      dataSource: this.getDataSource(data)
    });
  },
  renderRow: function (item) {
    return (
        <View>
          <Image style={{width: 80, height: 80}} source={{uri: 'http:' + item.profile_picture.href}}/>
        </View>
    );
  },
  onEndReached: function () {
    console.log('onEndReached', this.state.isLoadingTail);
    if (this.state.isLoadingTail) {
      // We're already fetching
      return;
    }
    this.setState({
      isLoadingTail: true
    });

    this.setState({
      isLoadingTail: false,
      dataSource: this.getDataSource(data)
    });
  },
  getDataSource: function (users):ListView.DataSource {
    this._data = this._data.concat(users);
    return this.state.dataSource.cloneWithRows(this._data);
  },
  render: function () {
    return (
        <View style={styles.container}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              onEndReached={this.onEndReached}
          />
        </View>);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});
AppRegistry.registerComponent('InfiniteListView', () => InfiniteListView);
