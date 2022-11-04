import { View, Text, Button,TextInput, FlatList ,SafeAreaView,StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'

import {initDb,dataBaseConnection} from './db/db';
import {insertDataToStudentTable,getAllDataFromStudent} from './db/StudentTable';

export default function App() {
     const [studentTable, setTableStudentStatus] = useState("");
     const [name, setName] = useState("");
     const [gender, setGender] = useState("");
     const [age, setAge] = useState(20);
     const [studentDetails,setStudentDetails] = useState([])

      
      const studentdata = {
           name : name,
           gender : gender,
           age : age,
      }
    
    // save student information to db
    const save = async () =>{
            try{
              // create databse  connection
              const db = await dataBaseConnection();
             

                // insset data to table
                const s =  await insertDataToStudentTable(db,studentdata);
                alert("save success")

                //getAll students
                getAll();
          
            }catch(err){
                alert("error inserting student data");
            }finally{
                 // close connection
                 db.close();
            }
             
    }

    // get AA student information From  db
    const getAll = async () =>{
     
          try{
            // create databse  connection
            const db = await dataBaseConnection();
          
            // get data from table
          const students =   await getAllDataFromStudent(db);
          
          setStudentDetails(students);
          
          }catch(err){
              alert("error getiig from student tbl");
          }finally{
              // close connection
              db.close();
          }
    }


 
  useEffect(() => {
      
    
   // inttialize data base 
   const init = async () =>{
       await initDb();
   }  

   init();

          
  }, [])




   //flat list item 
  const renderItem = ({ item }) => (
      <View style={styles.border}>
             <Text>{item.name}</Text>
             <Text>{item.gender}</Text>
             <Text>{item.age}</Text>
      </View>
 );

  return (
    <View>
      <Text> name </Text>
      <TextInput
        style={{ 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        placeholderTextColor: 'gray',
      }}
      onChangeText={n => setName(n)}
      value={name}
	   
    />


     <Text> gender </Text>
      <TextInput
        style={{ 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        placeholderTextColor: 'gray',
      }}
      onChangeText={n => setGender(n)}
      value={gender}
	   
    />


<Text> Age </Text>
      <TextInput
        style={{ 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        placeholderTextColor: 'gray',
      }}
      onChangeText={n => setAge(n)}
      value={age}
	   
    />
      <Button title='Save' onPress={save}/>
    
      <Button title='getAll' onPress={getAll}/>
      <Text> Get All </Text>
      
      <SafeAreaView >
          <FlatList
            data={studentDetails}
            renderItem={renderItem}
            keyExtractor={item => console.log(item)}  // show console all get data ,     NOTE : the list not printed all data , so you shoud refere metro console
          />
    </SafeAreaView>

    </View>
  )
}



const styles = StyleSheet.create({
  border: {
     border:2,
     borderColor:"red",
     borderWidth:2
  },
  
});
