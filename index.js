var React = require('react');
var {
  dice,
  casualties,
  battle,
  risk
} = require('risk-dice');

function sub(a, b) {
  return b - a;
}

function diceUnicode(n) {
  return String.fromCharCode(0x2680 + n - 1);
}

var Dice = React.createClass({
  render() {
    return <div className={"dice " + this.props.className}>
      {this.props.dice.map((die, i) => <div className="die" key={i}>{diceUnicode(die)}</div>)}
    </div>;
  }
});

var App = React.createClass({
  getInitialState() {
    return {
      attack: 0,
      defend: 0,
      casualties: false,
      dice: false
    };
  },

  changeNumber(e) {
    var s = {};
    s[e.target.name] = parseInt(e.target.value);
    this.setState(s);
  },

  roll() {
    var attack = dice(6, this.state.attack).sort(sub);
    var defend = dice(6, this.state.defend).sort(sub);

    this.setState({
      casualties: casualties(battle(attack, defend)),
      dice: {attack, defend}
    });
  },

  render() {
    return <div style={{width: "320px"}} className="center-block">
      <h1>Risk dice roll</h1>
      <div className="row">
      <div className="col-xs-6 form-group">
        <input type="number" onChange={this.changeNumber} name="attack" className="form-control input-lg attack" placeholder="Attack dice"/>
      </div>
      <div className="col-xs-6 form-group">
        <input type="number" onChange={this.changeNumber} name="defend" className="form-control input-lg" placeholder="Defence dice"/>
      </div>
      <div className="col-xs-12">
        <button type="button" onClick={this.roll} className="btn btn-primary btn-block">Roll</button>
      </div>
      {this.state.casualties && <div>
       <h2 className="col-xs-6 attack">Attacker lost {this.state.casualties.attacker}</h2>
       <h2 className="col-xs-6 defend">Defender lost {this.state.casualties.defender}</h2>
      </div>}
      {this.state.dice && <div>
       <Dice dice={this.state.dice.attack} className="col-xs-6 attack"/>
       <Dice dice={this.state.dice.defend} className="col-xs-6 defend"/>
      </div>}
      </div>
    </div>;
  }
});

React.render(<App/>, document.documentElement);
document.title = 'Risk dice';
require('bootstrap/dist/css/bootstrap.css');
require('./style.css');
