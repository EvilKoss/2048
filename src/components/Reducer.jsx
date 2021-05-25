const LEFT = "LEFT";

const RIGHT = "RIGHT";

const UP = "UP";

const DOWN = "DOWN";

const initialState = {
  score:24,
  tableNumbers : [
    [2,2,2,2],
    [2,2,4,8],
    [0,0,4,2],
    [2,0,0,2]
  ]
}

const add = (newTable) => {
  let str = [];
  for (var y = 0; y < newTable.length; y++) {
    for (var x = 0; x < newTable.length; x++) {
      if (newTable[y][x] == 0) {
        str.push({y:y,x:x});
      }
    }
  }
  if (str.length > 0) {
    let number = Math.floor(Math.random() * str.length);
    let x = str[number].x;
    let y = str[number].y;
    let rnd = Math.floor(Math.random() * 10);
    newTable[y][x] = rnd > 7 ? 4 : 2;
  }
}

const check = (newTable) => {
  let bool = true;
  for(let y = 0; y < 4; y++){
    for(let x = 0; x < 4; x++){
      if(newTable[y][x] == 0){
        bool = false;
      }
      if(y-1 >= 0 && newTable[y-1][x] == newTable[y][x]){
        bool = false;
      }
      if(x-1 >= 0 && newTable[y][x-1] == newTable[y][x]){
        bool = false;
      }
      if(y+1 < 4 && newTable[y+1][x] == newTable[y][x]){
        bool = false;
      }
      if(x+1 < 4 && newTable[y][x+1] == newTable[y][x]){
        bool = false;
      }
    }
  }
  return bool;
}

const change = (newTable,step,newScore) => {
  let bool = false;
  let start = step > 0 ? 0 : 3;
  let condition = step > 0 ? (v) => (v < 4) : (v) => (v >= 0);
  for(let y = start; condition(y); y+=step) {
    let indexZero = -1;
    let indexNumber = -1;
    for(let x = start; condition(x); x+=step) {
      if(indexNumber >= 0 && newTable[y][x] == newTable[y][indexNumber]){
        newTable[y][indexNumber] *= 2;
        newScore += newTable[y][indexNumber];
        newTable[y][x] = 0;
        indexZero = indexNumber + step;
        indexNumber = -1;
        bool = true;
      }
      else if(newTable[y][x] != 0 && indexZero >= 0){
        newTable[y][indexZero] = newTable[y][x];
        newTable[y][x] = 0;
        indexNumber = indexZero;
        indexZero = indexZero + step;
        bool = true;
      }

      if(newTable[y][x] != 0){
        indexNumber = x;
      }
      if(newTable[y][x] == 0 && indexZero == -1){
        indexZero = x;
      }
    }
  }
  if (bool) {
    add(newTable);
  }
  if (check(newTable)) {
    newScore = 0;
    alert("END GAME");
    newTable=[
      [2,2,2,2],
      [2,2,4,8],
      [0,0,4,2],
      [2,0,0,2]
    ]
  }
  const answear = {newTable:newTable, newScore:newScore};
  return answear;
}

const change2 = (newTable,step,newScore) => {
  let bool = false;
  let start = step > 0 ? 0 : 3;
  let condition = step > 0 ? (v) => (v < 4) : (v) => (v >= 0);
  for(let y = start; condition(y); y+=step) {
    let indexZero = -1;
    let indexNumber = -1;
    for(let x = start; condition(x); x+=step) {
      if(indexNumber >= 0 && newTable[x][y] == newTable[indexNumber][y]){
        newTable[indexNumber][y] *= 2;
        newScore += newTable[indexNumber][y];
        newTable[x][y] = 0;
        indexZero = indexNumber + step;
        indexNumber = -1;
        bool = true;
      }
      else if(newTable[x][y] != 0 && indexZero >= 0){
        newTable[indexZero][y] = newTable[x][y];
        newTable[x][y] = 0;
        indexNumber = indexZero;
        indexZero = indexZero + step;
        bool = true;
      }

      if(newTable[x][y] != 0){
        indexNumber = x;
      }
      if(newTable[x][y] == 0 && indexZero == -1){
        indexZero = x;
      }
    }
  }
  if (bool) {
    add(newTable);
  }
  if (check(newTable)) {
    newScore = 0;
    alert("END GAME");
    newTable=[
      [2,2,2,2],
      [2,2,4,8],
      [0,0,4,2],
      [2,0,0,2]
    ]
  }
  const answear = {newTable:newTable, newScore:newScore};
  return answear;
}

const deepcopy = (object) => {
  return JSON.parse(JSON.stringify(object))
}

const Reducer = (state = initialState,action) => {
  switch (action.type) {
    case LEFT:
      {
        let newTable = deepcopy(state.tableNumbers);
        let newScore = deepcopy(state.score);

        let answear = change(newTable,1,newScore);
        newTable = answear.newTable;
        newScore = answear.newScore;
        return {...state, tableNumbers:newTable,score:newScore};
      }
    case RIGHT:
      {
        let newTable = deepcopy(state.tableNumbers);
        let newScore = deepcopy(state.score);


        let answear = change(newTable,-1,newScore);
        newTable = answear.newTable;
        newScore = answear.newScore;
        return {...state, tableNumbers:newTable,score:newScore};
      }
    case UP:
      {
        let newTable = deepcopy(state.tableNumbers);
        let newScore = deepcopy(state.score);

        let answear = change2(newTable,1,newScore);

        newTable = answear.newTable;
        newScore = answear.newScore;

        return {...state, tableNumbers:newTable,score:newScore};
      }
    case DOWN:
      {
        let newTable = deepcopy(state.tableNumbers);
        let newScore = deepcopy(state.score);
        let answear = change2(newTable,-1,newScore);

        newTable = answear.newTable;
        newScore = answear.newScore;
        return {...state, tableNumbers:newTable,score:newScore};
      }
    default:
      return state;
  }
}

export const left = () => ({type:LEFT});

export const right = () => ({type:RIGHT});

export const up = () => ({type:UP});

export const down = () => ({type:DOWN});

export default Reducer;
