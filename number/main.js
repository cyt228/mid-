
var array=['1','2','3','4','5','6','7','8','9','10','11','12','13','14',' ',' '];
var nowSapce=16;
var nowSapce2=15;
var start=0;

function change(id){
	if(document.getElementById(id).innerHTML==' '){
		return;
	}
	var isChanged=0;
	if(Number(id)+1==nowSapce){
		if(Number(id)!=4 && Number(id)!=8 && Number(id)!=12){
			document.getElementById(nowSapce).innerHTML=document.getElementById(id).innerHTML;
			document.getElementById(id).innerHTML=' ';
			nowSapce=id;
			id=Number(id)+1;
			isChanged=1;
			start=1;
		}
	}
	else if(Number(id)-1==nowSapce){
		if(Number(id)!=5 && Number(id)!=9 && Number(id)!=13){
			document.getElementById(nowSapce).innerHTML=document.getElementById(id).innerHTML;
			document.getElementById(id).innerHTML=' ';
			nowSapce=id;
			id=Number(id)-1;
			isChanged=1;
			start=1;
		}
	}
	else if(Number(id)+4==nowSapce){
		document.getElementById(nowSapce).innerHTML=document.getElementById(id).innerHTML;
		document.getElementById(id).innerHTML=' ';
		nowSapce=id;
		id=Number(id)+4;
		isChanged=1;
		start=1;
	}
	else if(Number(id)-4==nowSapce){
		document.getElementById(nowSapce).innerHTML=document.getElementById(id).innerHTML;
		document.getElementById(id).innerHTML=' ';
		nowSapce=id;
		id=Number(id)-4;
		isChanged=1;
		start=1;
	}
	//
	if(Number(id)+1==nowSapce2 && isChanged==0){
		if(Number(id)!=4 && Number(id)!=8 && Number(id)!=12){
			document.getElementById(nowSapce2).innerHTML=document.getElementById(id).innerHTML;
			document.getElementById(id).innerHTML=' ';
			nowSapce2=id;
			start=1;
		}
	}
	else if(Number(id)-1==nowSapce2 && isChanged==0){
		if(Number(id)!=5 && Number(id)!=9 && Number(id)!=13){
			document.getElementById(nowSapce2).innerHTML=document.getElementById(id).innerHTML;
			document.getElementById(id).innerHTML=' ';
			nowSapce2=id;
			start=1;
		}
	}
	else if(Number(id)+4==nowSapce2 && isChanged==0){
		document.getElementById(nowSapce2).innerHTML=document.getElementById(id).innerHTML;
		document.getElementById(id).innerHTML=' ';
		nowSapce2=id;
	}
	else if(Number(id)-4==nowSapce2 && isChanged==0){
		document.getElementById(nowSapce2).innerHTML=document.getElementById(id).innerHTML;
		document.getElementById(id).innerHTML=' ';
		nowSapce2=id;
		start=1;
	}
}

function shuffle(array) {
	document.getElementById('t1').innerHTML=' ';
	for(let i=array.length-1;i>0;i--){
		let j=Math.floor(Math.random()*(i+1));
		[array[i],array[j]]=[array[j],array[i]];
	}
	for(var i=1;i<=16;i++){
		document.getElementById(i).innerHTML=array[i-1];
		if(array[i-1]==' '){
			nowSapce=i;
		}
	}
	for(var i=1;i<=16;i++){
		if(array[i-1]==' '){
			nowSapce2=i;
			break;
		}
	}
}

function check(){
	var fin=1;
	for(var i=1;i<=14;i++){
		if(document.getElementById(i).innerHTML!=i){
			fin=0;
			break;
		}
	}
	if(fin && start==1){
		document.getElementById('t1').innerHTML="恭喜完成！";
		//alert('恭喜完成！');
		start=0;
	}
}

window.setInterval("check()" , 300);