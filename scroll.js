import React from 'react';
import { StyleSheet , View , Picker, ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements'


class Scroll extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }
  getFormatted = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    date = new Date(date)
    return  date.getDate() +" "+ monthNames[date.getMonth()] + " " + date.getHours() + ":" + date.getMinutes()
  }
 
  render(){
    return (
        <View style={{flex:1}}><ScrollView>
        {this.props.trans.slice(0).reverse().map((elem, i) => (
            <ListItem
              key={i}
              title={elem.from}
              rightTitle={elem.amount + " $"}
              rightSubtitle={this.getFormatted(elem.date)}
              subtitle={elem.details}
              bottomDivider
            />
          ))}
          </ScrollView></View>
    );
  }
}

export default Scroll;
