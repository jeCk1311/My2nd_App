function S(){
	localStorage.setItem('Inputs', document.getElementById('N').value);
	document.getElementById('N').value=null;
}
function Del(){
	localStorage.removeItem('Inputs');
}
function Set(){
	document.getElementById('N').value=localStorage.getItem('Inputs');
}