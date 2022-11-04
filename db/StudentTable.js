
// Student table

export const insertDataToStudentTable = async (db,data) =>{
       
    const query = `INSERT INTO students(name,gender,age) VALUES('${data.name}','${data.gender}','${data.age}')`
    return  db.executeSql(query)
}


export const getAllDataFromStudent = async (db) =>{
    const students = [];
    const res =   await db.executeSql("SELECT name,gender,age FROM students")
    res.forEach(
       function(result){

           for(let i = 0; i < result.rows.length; i++){
                    students.push(result.rows.item(i));
           } 

       }
    );
  
    return students;

}