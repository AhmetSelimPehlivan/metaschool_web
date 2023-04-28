import  React, {useEffect, useState} from "react";
import TableComponent from "../components/Table/TableComponent";
import BoxGraph from "../components/BoxGraph/BoxGraph";
import LineGraph from "../components/LineGraph/LineGraph";
// reactstrap components
import {
  Row,
  Col
} from "reactstrap";
function Dashboard() {
  
const [tasks,setTasks] = useState([])
const [geoGraph,setGeoGraph] = useState([])
const [mathGraph,setMathGraph] = useState([])
const [taskCount,setTaskCount] = useState([])

useEffect(() => {
  async function fetchData(){
    fetch('https://metaschool-web.onrender.com/getTasks', {
    mode: 'cors',
    credentials: 'include'}).then(response => response.json())
    .then(data => {
      
    const taskArray = []
    const geoArray = []
    const mathArray = []
    const taskCount = [0,0,0,0,0]

      for (let key = 1; key < data.tasks.Count; key++) {
        if(data.tasks[key].game_id === 1)
          taskArray.push({id: data.tasks[key].game_id, title: data.tasks[key].game_name, result: data.tasks[key].timer})
        else if(data.tasks[key].game_id === 2){
          taskArray.push({id: data.tasks[key].game_id, title: data.tasks[key].game_name, result: data.tasks[key].game_result.replace(/1/g, 'W').replace(/0/g, 'L ')})
          mathArray.push(data.tasks[key].game_result.split("1").length - 1)
        }
        else if(data.tasks[key].game_id === 3)
          taskArray.push({id: data.tasks[key].game_id, title: data.tasks[key].game_name, result: (data.tasks[key].true_answers+"/"+data.tasks[key].total_answers)})
        else if(data.tasks[key].game_id === 4)
          taskArray.push({id: data.tasks[key].game_id, title: data.tasks[key].game_name, result: data.tasks[key].timer})
        else if(data.tasks[key].game_id === 5){
          taskArray.push({id: data.tasks[key].game_id, title: data.tasks[key].game_name, alt_title: data.tasks[key].climate, result: data.tasks[key].correct_answers+"/"+data.tasks[key].total_answers})
          geoArray.push(parseInt(data.tasks[key].correct_answers)-(parseInt(data.tasks[key].total_answers)*(0.25)))
        }
        taskCount[data.tasks[key].game_id-1] +=1
      }
      setTasks(taskArray)
      setGeoGraph(geoArray)
      setMathGraph(mathArray)
      setTaskCount(taskCount)
    })
    .catch(error => {});
  }
  fetchData()
},[]);
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <LineGraph 
              title="Play Score" 
              data={taskCount} 
              labelData="Weekly Play Score"
              labels = {["MONDAY", "THUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]} />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <LineGraph 
              title="Geography" 
              data={geoGraph} 
              labelData="Geography Game Score"
              labels={Array(geoGraph.length).fill().map((_, index) => (index + 1)+".Game")}/>
          </Col>
          <Col lg="4">
            <BoxGraph title={taskCount.reduce((total, num) => total + num, 0)+" Task"} data={taskCount}/>
          </Col>
          <Col lg="4">
            <LineGraph 
              title="Math" 
              data={mathGraph} 
              labelData="Math Game Correctness"
              labels={Array(mathGraph.length).fill().map((_, index) => (index + 1)+".Game")}/>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <TableComponent tasks={tasks}/>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
