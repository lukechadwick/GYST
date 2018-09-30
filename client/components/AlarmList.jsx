import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlarmEntry from './AlarmEntry'

const styles = theme => ({
    digit: {
        width:'80px',
        flexDirection: 'row',
        display: 'inline-block'
    }
});

// render () {
//     var alarmNodes = this.state.data.map(function(alarm, i){
//         if(alarm === undefined) return undefined;
//         return (
//             <AlarmEntry time={alarm.time} comment={alarm.comment} onClose={this.handleEntryClose.bind(this, i)} key={i} onRing={this.props.onRing} />
//         );
//     }.bind(this))

// var list = function(){
//         if(this.state.data.length == 0) {
//             return (<li className="list-group-item">None</li>);
//         }
//         else
//         {
//             return alarmNodes;
//         }
//     }.bind(this);

class AlarmList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }
    
    handleEntryClose(index){
        var state = this.state;
        state.data.splice(index, 1);
        this.setState(state);
    }

    handleAddEntry(entry){
        var state = this.state;
        state.data.push(entry);
        this.setState(state);
    }

    render() {
        const { classes } = this.props;
        var alarmNodes = this.state.data.map(function(alarm, i){
            if(alarm === undefined) return undefined;
            return (
                <AlarmEntry time={alarm.time} comment={alarm.comment} onClose={this.handleEntryClose.bind(this, i)} key={i} onRing={this.props.onRing} />
            );
        }.bind(this));
        var list = function(){
            if(this.state.data.length == 0) {
                return (<li className="list-group-item">None</li>);
            }
            else
            {
                return alarmNodes;
            }
        }.bind(this);
        //  var value = paddy(this.state.value, 2);
        return (
            <ul className="alarmList list-group">
                 {list()} 
            </ul>
        )
    }
}

export default withStyles(styles)(AlarmList);

