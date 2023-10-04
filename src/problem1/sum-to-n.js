var sum_to_n_a = function(n) {
  return n * (n+ 1) / 2
};

var sum_to_n_b = function(n) {
  let total = 0
  for (let i = n; i > 0; i--){
    total += i
  }
  return total
};

var sum_to_n_c = function(n) {
  new Array(n).fill().reduce((total, _item, index) => total + index + 1, 0)
};