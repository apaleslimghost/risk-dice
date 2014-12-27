document.title = 'Risk dice';

var React = require('react');
var {
  dice,
  casualties,
  battle,
  risk
} = require('risk-dice');

var App = React.createClass({
  getInitialState() {
    return {
      attack: 0,
      defend: 0,
      casualties: false
    };
  },

  changeNumber(e) {
    var s = {};
    s[e.target.name] = parseInt(e.target.value);
    this.setState(s);
  },

  roll() {
    this.setState({
      casualties: risk(this.state.attack, this.state.defend)
    });
  },

  render() {
    return <div>
      <input type="number" onChange={this.changeNumber} name="attack"/>
      <input type="number" onChange={this.changeNumber} name="defend"/>
      <button type="button" onClick={this.roll}>Roll</button>
      <ul>
        <li>Attacker lost {this.state.casualties.attacker}</li>
        <li>Defender lost {this.state.casualties.defender}</li>
      </ul>
    </div>;
  }
});

React.render(<App/>, document.documentElement);
