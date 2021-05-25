import Present from './Present';
import Reducer from './Reducer';
import {connect} from 'react-redux';
import {left,right,up,down} from './Reducer';

const mapStateToProps = (state) => {
  return{
      tableNumbers: state.combine.tableNumbers,
      score: state.combine.score
  }
}

const mapDispatchToProps = {
  left,right,up,down
}

const Container = connect(mapStateToProps,mapDispatchToProps)(Present);

export default Container;
