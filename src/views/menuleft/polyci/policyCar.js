import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import {GetInformation} from '../../../service/account'

export default function policyCar() {
  const [data, setdata] = useState([])
  handleLoad = async () => {
    try {
      const result = await GetInformation({
        USERNAME: "123456",
        TYPES: 2,
        CATEGORY: "",
        IDSHOP: "ABC123",
      })
      console.log(result)
      setdata(result.data)
    } catch (error) {
      console.log('error')
    }
  }
  
  return (
    <View>
        <TouchableOpacity
        
            onPress={()=>{}}
        ><Text>Chính sách vận chuyển</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})
