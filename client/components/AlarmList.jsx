import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  list: {
    fontSize: '2em'
  },
  btn: {
    marginLeft: '5%'
  }
});

class AlarmList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: this.props.data
    // };
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(i) {
  //   this.props.pauseAlarm();

  //   this.deleteArr(i);
  // }

  // deleteArr(i) {
  //   console.log(this.props.data);
  // }
  render() {
    console.log('alarm list state');
    console.log(this.props.data);

    const { classes } = this.props;
    return (
      <div>
        <ul>
          {this.props.data.map((alarm, i) => {
            console.log(i);

            return (
              <p key={i} className={classes.list}>
                {alarm.hours}:{alarm.minutes}
                <Button
                  className={classes.btn}
                  onClick={() => this.props.handleClickDel(alarm)}
                >
                  <Delete />
                </Button>
                <Button variant="contained" color="secondary">
                  Confirm
                </Button>
              </p>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(AlarmList);