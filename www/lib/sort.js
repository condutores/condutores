var sorting_by = function(field, reverse, primer){
var key = primer ?
function(x) {return primer(x[field])} :
function(x) {return x[field]};
reverse = !reverse ? 1 : -1;
return function (a, b) {
return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
}
}

var sort_by_default = 'Fortaleza';
$scope.form_sort = function(){
var reverse = $scope.form_sort.reserve;
var sort_by = $scope.form_sort.sort_by;
if(typeof sort_by == "undefined"){
sort_by=sort_by_default;
}
$scope.two_icons.sort(sorting_by(sort_by, reverse, function(a){return a.toUpperCase()}));