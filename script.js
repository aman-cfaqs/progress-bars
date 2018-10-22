function createNode(element) {
	return document.createElement(element);
}

function updateProgressBar(ev){
	var progress_limit = document.getElementById('limit').value;
	var currBtn = ev.currentTarget.id;
	var btnVal = document.getElementById(currBtn).value;

	var currentBar = document.getElementById('progress_select');
	var currentBarIndex = currentBar.options[currentBar.selectedIndex].value;

	var currBarValue = document.getElementById(currentBarIndex).getAttribute('data-value');

	var totalProgress = parseInt(currBarValue) + parseInt(btnVal);
	if( totalProgress <= progress_limit){
		if(totalProgress <=0){
			totalProgress = 0;
		}
		var parentBar = document.getElementById(currentBarIndex);
		parentBar.setAttribute('data-value', totalProgress);
		var child = parentBar.children[0];
		child.style.width = totalProgress+'%';
		if(totalProgress > 100){
			child.style.backgroundColor = 'red';
		}else{
			child.style.backgroundColor = '#2BC253';
		}
		child.innerHTML = '<span>'+totalProgress+'%</span>';
	}


	console.log(progress_limit + '---' + btnVal +' ----- '+currentBarIndex +' -- '+currBarValue+' ----' +totalProgress);
}

const btns = document.getElementById('buttons');
const url = "http://pb-api.herokuapp.com/bars";

fetch(url)
.then(response => response.json())
.then(function(data){
	let limit = data.limit;
	document.getElementById('limit').value = limit;
	//Insert buttons
	let buttons = data.buttons;
	var btnHTML =  buttons.map(function(val, x){
		x++;
		let btn = createNode('button');
		btn.id = 'btn'+x;
		var txt = document.createTextNode(val);
		btn.value = val;
		btn.appendChild(txt);
		document.getElementById('buttons').appendChild(btn);

	});		
	
	//Insert progress bars
	var bars = data.bars;
	var barsHTML = bars.map(function(val, i){
		i++;
		let bar = createNode('div');
		bar.id = 'bar'+i;
		bar.className="bar";
		bar.setAttribute('data-value', val);
		let div = createNode('div');
		div.id = 'progress'+i;
		div.className = 'progress';
		div.style.width = val+'%';
		let spanEle = createNode('span');
		spanEle.innerHTML = val+'%';
		document.getElementById('bars').appendChild(bar);
		document.getElementById('bar'+i).appendChild(div);
		document.getElementById('progress'+i).appendChild(spanEle);

		let select = createNode('option');
		select.value = 'bar'+i;
		select.innerHTML = '#bar'+i;
		document.getElementById('progress_select').appendChild(select);
	});

	var allBtns = document.querySelectorAll('button');
	allBtns.forEach( btn => {
		btn.addEventListener('click', updateProgressBar);
	});
})
.catch(function(error){ console.log(error); })

		
