import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {RouteProp} from '@react-navigation/native';
import styles from '../resources/styles';

interface PostItem {
  title: string;
  url: string;
  created_at: string;
  author: string;
}
type RootStackParamList = {
  PostDetail: {item: PostItem};
};

type DetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

type Props = {
  navigation: NavigationStackProp;
  route: DetailRouteProp;
};
type States = {
  item: PostItem;
};

class ListingDetailScreen extends PureComponent<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      item: {
        title: '',
        url: '',
        created_at: '',
        author: '',
      },
    };
  }
  componentDidMount() {
    const {item} = this.props.route.params;
    this.setState({item: item});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.item ? JSON.stringify(this.state.item) : 'Nothing'}
        </Text>
      </View>
    );
  }
}

export default ListingDetailScreen;
