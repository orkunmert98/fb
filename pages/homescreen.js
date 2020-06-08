import * as React from 'react';
import {ActivityIndicator,View,Button,ScrollView} from 'react-native'
import { Feather,Entypo } from '@expo/vector-icons'; 
import { firestore} from "../firebase/firebase.utils"
import {connect } from "react-redux"
import {additem} from "../redux/Card"
import Cards from "../components/postcard/postcard"
import Postit from "../components/postcard/postit"
function HomeScreen({ navigation,posts,update }) {
const [loading,setloading]=React.useState(false)
React.useEffect(() => {
  let a;
 
  a=firestore.collection("Posts")
    .onSnapshot(function(snapshot) {
      let Array=[]
setloading(true)
      snapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        Array.push(doc.data());
    });
update(Array.reverse())
setloading(false)
    }, function(error) {
        //...
    });
  return () => {
    a()
  }
}, [])




  const [open,setopen]=React.useState(false)
  //console.log(open)
    return (
      <View style={{ flex: 1, }}>
        <View style={{height:50,backgroundColor:"white", display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:14}}>

<Feather as={Button} onPress={() => navigation.openDrawer()} height={14}  name="menu" size={24} color="black" />
<Entypo name="new-message" size={24} color="black" onPress={()=>setopen(true)}/>
</View>
<Postit open={open} setopen={setopen}></Postit>
{loading?(<ActivityIndicator size="large" color="#0000ff" />):(

<ScrollView>
{posts.map(item=><Cards email={item.email} key={item.id} image={item.imgUrl} post={item.post} id={item.id} time={item.createdAt} name={item.name}></Cards>)}
</ScrollView>

)}

       
      </View>
    );
  }
const s=state=>({
  posts:state.cart.cartItems
})
const d=dispatch=>({
  update:(p)=>dispatch(additem(p))
})
export default connect(s,d)(HomeScreen);