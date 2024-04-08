import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css';
import { ActionType, StudentAction } from './Task1/student-action';
import { useState } from 'react';
import actionList from './action-list.json';

function App() {
  const studentActions = actionList as unknown as StudentAction[];

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Code Capsule Dashboard
        </h1>
      </header>

			<div className="dashboard-layout">
        <MostUsedActions inputData={studentActions} />
        <ActionsUsedThroughTime inputData={studentActions} />
        <ActionsUsedByStudents inputData={studentActions} />
      </div>
    </div>
  );
}

function MostUsedActions({ inputData }: { inputData: StudentAction[]}) {

  const chartData = Object.keys(ActionType).map(key => {
    return {
      action: key,
      quantity: inputData.filter(action => action.type === key).length
    }
  });

  return (
    <div className="graph-container">
      <h3>Most used actions</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="action" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function ActionsUsedThroughTime({ inputData }: { inputData: StudentAction[]}) {

  const inputDataTruncatedToHours = inputData.map(studentAction => {
    let newDate = new Date(studentAction.createdAt);
    newDate.setMinutes(0);
    return {...studentAction, createdAt: newDate.toISOString()}
  });

  const chartData: any = [];
  inputDataTruncatedToHours.forEach(action => {
    const timeStampIndex = chartData.findIndex((x: any) => x.createdAt === action.createdAt);

    if(timeStampIndex < 0) {
      const newDataPoint: any = { createdAt: action.createdAt };
      newDataPoint[action.type] = 0;

      chartData.push(newDataPoint);
    } else {
      if(Object.hasOwn(chartData[timeStampIndex], action.type)) {
        chartData[timeStampIndex][action.type] += 1;
      } else {
        chartData[timeStampIndex][action.type] = 0;
      }
    }
  });

  return (
    <div className="graph-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="RUN" stroke="#003f5c" />
          <Line type="monotone" dataKey="SAVE" stroke="#58508d" />
          <Line type="monotone" dataKey="CLEAR" stroke="#bc5090" />
          <Line type="monotone" dataKey="GENERATE_FIGURE" stroke="#ff6361" />
          <Line type="monotone" dataKey="ANSWER" stroke="#ffa600" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function ActionsUsedByStudents({ inputData }: { inputData: StudentAction[] }) {
  const [selectedActionType, setSelectedActionType] = useState("RUN");

  const chartData: any[] = [];
  inputData.forEach(action => {
    const timeStampIndex = chartData.findIndex((x: any) => x.name === action.member.name);

    if(timeStampIndex < 0) {
      const newDataPoint: any = { name: action.member.name };
      newDataPoint[action.type] = 0;

      chartData.push(newDataPoint);
    } else {
      if(Object.hasOwn(chartData[timeStampIndex], action.type)) {
        chartData[timeStampIndex][action.type] += 1;
      } else {
        chartData[timeStampIndex][action.type] = 0;
      }
    }
  });

  chartData.sort((a, b) => a[selectedActionType] - b[selectedActionType])

  return (
    <div className="graph-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={1200} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={selectedActionType} fill="#58508d" />
        </BarChart>
      </ResponsiveContainer>

      <label>
        Select an action:
        <select name="selectedAction" defaultValue="RUN" onChange={e => setSelectedActionType(e.target.value)}>
          <option value="RUN">Run</option>
          <option value="SAVE">Save</option>
          <option value="CLEAR">Clear</option>
          <option value="GENERATE_FIGURE">Generate figure</option>
          <option value="ANSWER">Answer</option>
        </select>
      </label>
    </div>
  )
}

export default App;
