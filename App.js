import React from 'react';
import { StyleSheet , View , Picker, ScrollView} from 'react-native';
import { Alert } from 'react-native'; 
// import Deneme from './deneme'
import { Button, ThemeProvider, Header, PricingCard, Text , Input, Overlay} from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import axios from 'axios'
const URL = "http://"
import Constants from "expo-constants";
const { manifest } = Constants;

import Scroll from './scroll'

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8080`)
  : `api.example.com`;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      site:'main',
      dollar: 0,
      chAmount: 5,
      chFrom: 'LeetCode',
      chDetails:'',
      transactions: [
      //   {
      //   from: 'LeetCode',
      //   amount: 15,
      //   details: 'amerikan yardimi',
      //   date : Date.now()
      // }
    ],
      visible: false
    }
  }
  makeTransaction = ({chFrom,chAmount,chDetails}) => {
    return {
      from: chFrom,
      amount: chAmount,
      details: chDetails,
      date : Date.now()
    }
  }
  getFormatted = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    date = new Date(date)
    return  date.getDate() +" "+ monthNames[date.getMonth()] + " " + date.getHours() + ":" + date.getMinutes()
  }
  componentDidMount(){
    axios.get(URL+api+"/operation/get")
      .then(res => {
        console.log('axios');
        console.log(res.data.body);
        this.setState({
          ...res.data.body
        })
      }).catch(err=>{})
  }

onButtonPress = () => {
  let trans = this.makeTransaction(this.state);
  let transactions = this.state.transactions;
  let dollar = this.state.dollar + trans.amount;
  transactions.push(trans);
  this.setState({
    ...this.state,
    dollar: dollar,
    transactions: transactions,
    visible:false
  })
  alert("Transaction added succesfully");
  console.log(api);
  axios.post(URL+api+"/operation/save",{
    token: "selamnaberarkadasim",
    body: this.state
  })
      .then(res => {
      }).catch(err=>{})
  
};
  render(){
    let overlay = <Overlay 
      isVisible={this.state.visible}
      onBackdropPress={()=>{this.setState({visible:false})}}
    >
    <View style={styles.Overlay}>
      <View style={styles.container}>
        <Text h1 >{this.state.chAmount}$</Text>
      </View>
      <Button title="Add Transaction" onPress={this.onButtonPress}/>
      <Picker
          selectedValue={this.state.chFrom}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => this.setState({chFrom:itemValue})}
        >
          <Picker.Item label="LeetCode" value="LeetCode" />
          <Picker.Item label="React" value="React" />
        </Picker>
        <Picker
          selectedValue={this.state.chAmount}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => this.setState({chAmount:itemValue})}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="25" value={25} />
          <Picker.Item label="50" value={50} />
          <Picker.Item label="100" value={100} />
          {/* <Picker.Item label="React" value="React" /> */}
        </Picker>
        <Input 
          placeholder="More Detail"
          onChangeText={value => this.setState({chDetails:value})}
        />

    </View>
  </Overlay>
  let Main = <View >
  <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress:()=>{this.setState({site:'scrol'})} }}
    centerComponent={{ text: 'ISMET BANK', style: { color: '#fff' } }}
    rightComponent={{ icon: 'home', color: '#fff', onPress:()=>{this.setState({site:'main'})} }}
  />
  <View style={styles.container}>
    <Text h1 >{this.state.dollar}$</Text>
  </View>
  <Button title="Add Transaction" onPress={()=>this.setState({visible:true})}/>
 
      {this.state.transactions.slice(0).reverse().map((elem, i) => (
        <ListItem
          key={i}
          title={elem.from}
          rightTitle={elem.amount + " $"}
          rightSubtitle={this.getFormatted(elem.date)}
          subtitle={elem.details}
          bottomDivider
        />
      ))}
 
  {overlay}
</View>
// let scrol =  <Scroll trans ={this.state.transactions} />
let scrol =   <View style={{flex:1}}><ScrollView>
{this.state.slice(0).reverse().map((elem, i) => (
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
let current = ""
if(this.state.site == 'main'){
  current = Main;
} else {
  current = scrol;
}
    return  <View>{current}</View>    
 
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    marginVertical :60,
    alignItems: 'center',
    justifyContent: 'center',
  }, Overlay: {
    width:300
  }
});

export default App;
