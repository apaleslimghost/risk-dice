var curry = require('curry');

function rand(a, b) {
  return a + Math.floor((b - a) * Math.random());
}

function dice(d, n) {
  return n === 0?   []
  : /* otherwise */ [rand(0, d) + 1].concat(dice(d, n - 1));
}

function sub(a, b) {
  return b - a;
}

function gt(a, b) {
  return a > b;
}

var zipWith = curry(function _zipWith(f, as, bs) {
  return as.length === 0? []
       : bs.length === 0? []
       : /* otherwise */  [f(as[0], bs[0])].concat(zipWith(f, as.slice(1), bs.slice(1)));
});

function casualties(results) {
  return results.reduce(function(lost, result) {
    return result ? {
      attacker: lost.attacker,
      defender: lost.defender + 1
    } : {
      attacker: lost.attacker + 1,
      defender: lost.defender
    };
  }, {
    attacker: 0,
    defender: 0
  });
}

var battle = zipWith(gt);

var risk_ = curry(function _risk_(d, attack, defend) {
  return casualties(battle(
    dice(d, attack).sort(sub),
    dice(d, defend).sort(sub)
  ));
});

var risk = risk_(6);

module.exports = risk;
require('util')._extend(module.exports, {
  risk: risk,
  risk_: risk_,
  casualties: casualties,
  battle: battle,
  dice: dice
});
