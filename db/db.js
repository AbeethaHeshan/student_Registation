
import {enablePromise,openDatabase} from 'react-native-sqlite-storage';

enablePromise(true)


export const dataBaseConnection = async () =>{
      const db = await openDatabase({name:"studentsD.db",location:'default'})
      return db;
}

export const createTableStudent = (db) =>{
        try{
            const query = "CREATE TABLE IF NOT EXISTS students (ID INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(225),gender VARCHAR(225) ,age INTEGER)"  
            return db.executeSql(query);
             
        }catch(e){
             alert("Table creatinh error");
        }
        
        
  
}
 

export  const initDb = async () =>  {
         const db = await dataBaseConnection();
         const x = await createTableStudent(db);
         console.log(x,"  xcxccxcx \n",db);
         db.close();
}  


