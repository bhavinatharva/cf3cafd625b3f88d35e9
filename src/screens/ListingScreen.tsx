import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from '../resources/styles';
import {NavigationStackProp} from 'react-navigation-stack';
import {SEARCH_BY_DATE} from '../network';

interface PostItem {
  title: string;
  url: string;
  created_at: string;
  author: string;
}
type Props = {
  navigation: NavigationStackProp;
};
type States = {
  page: number;
  lastPage: number;
  isAllFetch: boolean;
  postsList: Array<PostItem>;
};

class ListingScreen extends React.PureComponent<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0,
      lastPage: 0,
      postsList: [],
    };
  }
  fetchPostList = async () => {
    let result = await fetch(
      `${SEARCH_BY_DATE}?tags=story&page=${this.state.page}`,
    );
    let resultJson = await result.json();
    const {hits, nbHits, page, nbPages, hitsPerPage, exhaustiveNbHits} =
      resultJson;
    let postlists = hits.map((value: PostItem) => {
      return {
        title: value.title,
        url: value.url,
        created_at: value.created_at,
        author: value.author,
      };
    });
    this.setState({
      postsList:
        this.state.page === 1
          ? postlists
          : [...this.state.postsList, ...postlists],
      lastPage: nbPages,
    });
  };
  doClickItem = (item: PostItem) => {
    this.props.navigation.navigate('PostDetail', {item: item});
  };
  renderListItem = (item: PostItem, index?: number) => {
    return (
      <TouchableOpacity onPress={() => this.doClickItem(item)}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            margin: 10,
          }}>
          <Text style={{padding: 5, fontWeight: 'bold', color: 'black'}}>
            Title : {item.title}
          </Text>
          <Text style={{padding: 5, fontWeight: '500', color: 'black'}}>
            Auther : {item.author}
          </Text>
          <Text style={{padding: 5, fontWeight: '400', color: 'black'}}>
            Created Date :{item.created_at}
          </Text>
          <Text style={{padding: 5, fontWeight: '100', color: 'black'}}>
            URL : {item.url}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  handleLoadMore = () => {
    console.log(`page`, this.state.page, this.state.lastPage);
    if (this.state.page !== this.state.lastPage) {
      this.setState({page: this.state.page + 1}, () => {
        this.fetchPostList();
      });
    }
  };
  componentDidMount() {
    this.fetchPostList();
    setInterval(() => {
      this.setState({page: this.state.page + 1}, () => {
        this.fetchPostList();
      });
    }, 10000);
  }
  renderFooter = () => {
    return (
      <View style={{justifyContent: 'center', padding: 15}}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.postsList}
          onEndReachedThreshold={0.01}
          onEndReached={() => this.handleLoadMore()}
          renderItem={({item, index}) => this.renderListItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => this.renderFooter()}
        />
      </View>
    );
  }
}
export default ListingScreen;
