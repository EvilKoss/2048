import React from 'react';
import style from './Present.module.css';

const styles = [style.squareGrey, style.squareGren, style.squareBlue, style.squareYellow, style.squarePink,
style.squareOrange, style.squareRed];

class Present extends React.Component {
  press = (event) => {
    if(event.code == "ArrowLeft"){
      this.props.left();
    }
    else if(event.code == "ArrowRight"){
      this.props.right();
    }
    else if(event.code == "ArrowUp"){
      this.props.up();
    }
    else if(event.code == "ArrowDown"){
      this.props.down();
    }
  }
  componentDidMount(){
    window.onkeydown = this.press;
  }
  render() {
    const props = this.props;
    let str = [];
    const tableNumbers = props.tableNumbers;
    const score = props.score;

    let i = 0;
    while (i < 4) {
      let j = 0;
      while (j < 4) {
        let table = tableNumbers[i][j];
        let x = table;
        let y = 0;
        while(x > 1) {
          y += 1;
          x /= 2;
        }
        let squareStyle = styles[y % styles.length];
        if(table == 0) squareStyle = style.squareWhite;
        str.push(<div className={squareStyle}><p>{table}</p></div>);
        j++;
      }
      i++;
    }

    return (
      <div className={style.body}>
        {str}
        <div className={style.Score}>Score:{score}</div>
      </div>
    )
  }
}

export default Present;
