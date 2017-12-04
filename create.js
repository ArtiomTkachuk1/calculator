var input1,input2,udobno;
var kb=0;
var ku=0;
var s1="0123456789"
var s2="+-*/";
var errors=["деление на ноль","корень от отрицательного","arc от чего-то большего еденицы по модулю","неправильно расставлены скобки","строка пуста(полупуста) или с ошибками","cтрока с ошибками","Нарушено ОДЗ логарифма"]
var bini=["+","-","*","/","mod","^-","^"];
var uni=["arcsin","arccos","arcctg","arctg","sin","cos","ctg","tg","sqrt","exp","ln","lg"];
var uni1=["sin","cos","ctg","tg","sqrt","exp","ln","lg"];
var uni2=["arcsin","arccos","arcctg","arctg"];
var unibini=["arcsin","arccos","arcctg","arctg","sin","cos","ctg","tg","+","-","*","/","mod","^-","^","sqrt","exp","ln","lg"];
function zapbinar(){//функции для событий
  input1=document.getElementById('arg');
  if(this.innerHTML=="𝜋"){
	  var prii=input1.value;
	  if((prii.length!=0)&&(prii.charAt(prii.length-1)!="(")&&(prii.charAt(prii.length-1)!=")"))
		  input1.value+="+";
	  input1.value+=Math.PI.toString();
	  fans();
	  return;
	  }
  if(this.innerHTML=="ℯ"){
	  var prii=input1.value;
	  if((prii.length!=0)&&(prii.charAt(prii.length-1)!="(")&&(prii.charAt(prii.length-1)!=")"))
		  input1.value+="+";
	  input1.value+=Math.E.toString();
	  fans();
	  return;
	  }
  input1.value+=this.innerHTML;
  fans();
}
function zapunar(){
  input1=document.getElementById('arg');
  input1.value=this.innerHTML+"("+input1.value+")";
  fans();
}
function zapans(){
  fans();
  arg.value=rez.value;
}
function zapsign(){
  arg.value=rez.value;
  var zz=arg.value;
  if(zz.charAt(0)==="-") zz=zz.substr(1,zz.length-1);
  else if(s1.indexOf(zz.charAt(0))!=-1) zz="-"+zz;
  arg.value=zz;
  rez.value=zz;
  fans();
}
function zapc(){
  arg.value="";
  rez.value="";
}
function dobbuttonbinar(parent,type,simvol){//функция создания типов конопок
  input1=document.createElement(type);
  input1.innerHTML=simvol;
  input1.id=kb+'b';
  kb++;
  input1.className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
  parent.appendChild(input1);
}
function dobbuttonunar(parent,type,simvol){
  input1=document.createElement(type);
  input1.innerHTML=simvol;
  input1.id=ku+'u';
  ku++;
  input1.className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
  parent.appendChild(input1);
}
function dobbutton(parent,type,simvol){
  input1= document.createElement(type);
  input1.id="ans";
  input1.innerHTML=simvol;
  input1.className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
  parent.appendChild(input1);
}
function dobbutton1(parent,type,simvol){
  input1= document.createElement(type);
  input1.id="sign";
  input1.innerHTML=simvol;
  input1.className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
  parent.appendChild(input1);
}
function dobbutton2(parent,type,simvol){
  input1= document.createElement(type);
  input1.id="C";
  input1.innerHTML=simvol;
  input1.className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored";
  parent.appendChild(input1);
}
function count(s){
  var w=0;
  var ch=false;
  for(var wg=0; wg<s.length; wg++){
    if(s.charAt(wg)==")"){w--;ch=true;}
    if(s.charAt(wg)=="("){w++;ch=true;}
  }
  if(((w!=0)||(s.lastIndexOf(")")<s.lastIndexOf("(")))&&(ch==true)) return errors[3];
  s=s.replace(/√/g,"sqrt");
  s=s.replace(/×/g,"*");
  s=s.replace(/÷/g,"/");
  if(s.charAt(0)=='-')s='0'+s;
  for(wg=0; wg<uni2.length; wg++){
    var w=0;
    var sbt=uni2[wg];
    while(w<s.length){
      var opt=s.indexOf(sbt,w);
      if(opt!=-1){
        var qu=opt+sbt.length+1;
        sb=1;
        while((sb!=0)&&(qu<s.length)){
              if(s.charAt(qu)==")")sb--;
              if(s.charAt(qu)=="(")sb++;
              qu++;
        }
        qu--;
        s=s.substring(0,opt)+'('+s.substring(opt,qu+1)+')'+s.substr(qu+1,s.length-qu);//добавляем скобки для унарных
        w=opt+sbt.length+1;
      }
      else break;
    }
  }
  for(wg=0; wg<uni1.length; wg++){
    w=0;
    sbt=uni1[wg];
    while(w<s.length){
      var opt=s.indexOf(sbt,w);
      if((opt!=-1)&&(s.substr(opt-3,3)!="arc")&&(s.substr(opt-2,2)!="ar")&&(s.substr(opt-1,1)!="c")){
        var qu=opt+sbt.length+1;
        var sb=1;
        while((sb!=0)&&(qu<s.length)){
              if(s.charAt(qu)==")")sb--;
              if(s.charAt(qu)=="(")sb++;
              qu++;
        }
        qu--;
        s=s.substring(0,opt)+'('+s.substring(opt,qu+1)+')'+s.substr(qu+1,s.length-qu);//добавляем скобки для унарных
        w=opt+sbt.length+1;
      }
      else{
          if(opt==-1)break;
          w=opt+sbt.length+1;
      }
    }
  }
  w=0;
  while(s.indexOf(")(",w)!=-1){
      w=s.indexOf(")(",w)
      s=s.substring(0,w+1)+"*"+s.substr(w+1,s.length-w);//добавляем знаки умножения для скобок
  }
  w=0;
  while(s.indexOf(")",w)!=-1){
      w=s.indexOf(")",w);
      opt=s.charAt(w+1);
      if((w<s.length-1)&&(s1.indexOf(s.charAt(w+1))!=-1))
        s=s.substr(0,w+1)+'*'+s.substr(w+1,s.length-w-1);//добавляем знаки умножения для скобок и чисел
      w++;
  }
  w=0;
  while(s.indexOf("(",w)!=-1){
      w=s.indexOf("(",w);
      if((w>0)&&(s1.indexOf(s.charAt(w-1))!=-1))
        s=s.substr(0,w)+'*'+s.substr(w,s.length-w);//добавляем знаки умножения для скобок и чисел
      w++;
  }
  return count1(s);
}
function count1(s){
  var i=0;
  var ch=[];
  ch.push(10);
  ch.pop(10);
  var op=[];
  op.push(10);
  op.pop(10);
  if(s.charAt(0)=='-')s='0'+s;
  if(s.charAt(0)=='+')s=s.substr(1,s.length-1);
  while(i<s.length){
    if(s.charAt(i)=="("){
      var start=i+1;
      var sb=0;
      i=start;
      while((sb!=-1)&&(i<s.length)){
            if(s.charAt(i)===")")sb--;
            if(s.charAt(i)==="(")sb++;
            i++;
      }
      i--;
      var b=count1(s.substr(start,i-start));
      for(var pv=0;pv<errors.length;pv++){
        if(errors[pv]==b) return b;
      }
      if((b<0)&&(s.charAt(start-2)!="^")){
        var z=start-1;
        qq=false;
        while(z>0){
          if((s.charAt(z))==="+"){
            qq=true;
            s=s.substr(0,z)+"-"+s.substr(z+1,s.length-z);
            break;
          }
          else if((s.charAt(z))==="-"){
            qq=true;
            s=s.substr(0,z)+"+"+s.substr(z+1,s.length-z);
            break;
          }
          z--;
        }
        if(qq==false) {
          s="0-"+s;
          start=start+2;
          i=i+2;
        }
        b=-b;
      }
      s=s.substr(0,start-1)+b.toString()+s.substr(i+1,s.length-i);
      i=0;
      ch=[];
      op=[];
    }
    var ansi=0;
    var zah=false;
    while((s1.indexOf(s.charAt(i))!=-1)&&(i<s.length)){
      ansi=ansi*10+Number(s.charAt(i));
      i++;
      zah=true;
    }
    if(((s.charAt(i)==".")||(s.charAt(i)==","))&&(zah==true)){
      i++;
      var des=10;
      while((s1.indexOf(s.charAt(i))!=-1)&&(i<s.length)){
        ansi=ansi+Number(s.charAt(i))/des;
        des*=10;
        i++;
        zah=true;
      }
    }
    if(zah==true)ch.push(ansi);
    var zah2=false;
    for(var gg=0; gg<unibini.length; gg++){
      var sbt=unibini[gg];
      if(s.indexOf(sbt,i)==i){
          op.push(sbt);
          i+=sbt.length;
          zah2=true;
          break;
        }
      }
      if((zah2==false)&&(zah==false)) return errors[5];
  }
  if(ch.length==0) return errors[4];
  zah=false;
  var opt=0;
  if(op.length==2)opt++;
  for(gg=0; gg<uni.length; gg++){
      if(op[opt]==uni[gg]){
        zah=true;
        break;
      }
  }
  if(zah==true){
    if(opt==1)ch[opt]=-ch[opt];
    if(op[opt]=='sin')ans=Math.sin(ch[opt]);
    if(op[opt]=='cos')ans=Math.cos(ch[opt]);
    if(op[opt]=='tg')ans=Math.tan(ch[opt]);
    if(op[opt]=='ctg'){if(Math.tan(ch[opt])==0) return errors[0];ans=1/Math.tan(ch[opt]);}
    if(op[opt]=='arcsin'){if( Math.abs(ch[opt])>1)return errors[2];  ans=Math.asin(ch[opt]);}
    if(op[opt]=='arccos'){if( Math.abs(ch[opt])>1)return errors[2];ans=Math.acos(ch[opt]);}
    if(op[opt]=='arctg'){if( Math.abs(ch[opt])>1)return errors[2];ans=Math.atan(ch[opt]);}
    if(op[opt]=='arcctg'){if( Math.abs(ch[opt])>1)return errors[2];ans=Math.PI/2 - Math.atan(ch[opt]);}
    if(op[opt]=='sqrt'){if(ch[opt]<0)return errors[1]; ans=Math.pow(ch[opt],0.5)}
    if(op[opt]=='exp') ans=Math.exp(ch[opt]);
    if(op[opt]=='lg'){if(ch[opt]<=0)return errors[6];ans=Math.log10(ch[opt]);}
    if(op[opt]=='ln') {if(ch[opt]<=0)return errors[6];ans=Math.log(ch[opt]);}
  }
  else {
    if(ch.length-op.length!=1) return errors[4];
    while(i<op.length){
       if(op[i]==='^'){
         ch[i]=Math.pow(ch[i],ch[i+1]);
          for(var j=i+1;j<ch.length-1;j++)  ch[j]=ch[j+1];
          ch.pop();
          for(var j=i;j<op.length-1;j++)  op[j]=op[j+1];
          op.pop();
       }
       else i++;
     }
     i=0;
     while(i<op.length){
        if(op[i]==='^-'){
          if(ch[i]==0) return errors[0];
          ch[i]=Math.pow(1/ch[i],ch[i+1]);
           for(var j=i+1;j<ch.length-1;j++)  ch[j]=ch[j+1];
           ch.pop();
           for(var j=i;j<op.length-1;j++)  op[j]=op[j+1];
           op.pop();
        }
        else i++;
      }
    i=0;
    while(i<op.length){
       if(op[i]==='*'){
         ch[i]=ch[i+1]*ch[i];
          for(var j=i+1;j<ch.length-1;j++)  ch[j]=ch[j+1];
          ch.pop();
          for(var j=i;j<op.length-1;j++)  op[j]=op[j+1];
          op.pop();
       }
       else i++;
     }
     i=0;
     while(i<op.length){
        if(op[i]==='/'){
          if(ch[i+1]==0) return errors[0];
          ch[i]=ch[i]/ch[i+1];
           for(var j=i+1;j<ch.length-1;j++)  ch[j]=ch[j+1];
           ch.pop();
           for(var j=i;j<op.length-1;j++)  op[j]=op[j+1];
           op.pop();
        }
        else i++;
      }
      i=0;
      while(i<op.length){
         if(op[i]==="mod"){
           if(ch[i+1]==0) return errors[0];
           ch[i]=ch[i]%ch[i+1];
            for(var j=i+1;j<ch.length-1;j++)  ch[j]=ch[j+1];
            ch.pop();
            for(var j=i;j<op.length-1;j++)  op[j]=op[j+1];
            op.pop();
         }
         else i++;
       }
      var ans=ch[0];
      for(i=0;i<op.length;i++){
        if(op[i]=='+') ans+=ch[i+1];
        if(op[i]=='-') ans-=ch[i+1];
      }
  }
  return ans;
}
function fans(){
  input1=document.getElementById('arg');
  var s=input1.value;
  var ans=count(s);
  var oh=false;
  input1=document.getElementById('rez');
  for(var pv=0;pv<errors.length;pv++)
    if(errors[pv]==ans){input1.value=ans;oh=true;break;}
  if(oh==false) input1.value=ans.toString();
}
function createtable(parentid,m,n){
  for(var e0=0;e0<m;e0++){
    input1= document.createElement('tr');
    input1.id="tr"+e0;
    udobno=document.getElementById(parentid);
    udobno.appendChild(input1);
    for(var e1=0;e1<n;e1++){
      input2= document.createElement('td');
      input2.id="td"+e0+e1;
      udobno=document.getElementById(input1.id);
      udobno.appendChild(input2);
    }
  }
}
function create(id){
  var form1= document.getElementById(id);
  form1.align="center";
  form1.innerHTML+="<br>";
  form1.innerHTML+="Выражение:";
  form1.innerHTML+="<br>";
  input1= document.createElement('input');
  input1.type="text";
  input1.id="arg";
  input1.className="mdl-textfield mdl-js-textfield";
  form1.appendChild(input1);
  form1.innerHTML+="<br>";
  form1.innerHTML+="Результат:";
  form1.innerHTML+="<br>";
  input1= document.createElement('input');
  input1.type="text";
  input1.id="rez";
  input1.className="mdl-textfield mdl-js-textfield";
  input1.type="text";
  form1.appendChild(input1);
  form1.innerHTML+="<br>";
  form1.innerHTML+="<br>";
  input1= document.createElement('table');
  input1.align="center";
  input1.width="50%";
  input1.height="50%";
  //input1.className="mdl-data-table mdl-js-data-table";
  input1.id="maintable";
  form1.appendChild(input1);
  createtable(input1.id,6,6);
  udobno=document.getElementById("td00");
  dobbutton1(udobno,"button","&#177");
  udobno=document.getElementById("td01");
  dobbuttonbinar(udobno,"button","^");
  udobno=document.getElementById("td02");
  dobbuttonbinar(udobno,"button","(");
  udobno=document.getElementById("td03");
  dobbuttonbinar(udobno,"button",")");
  udobno=document.getElementById("td04");
  dobbuttonbinar(udobno,"button","mod");
  udobno=document.getElementById("td05");
  dobbutton2(udobno,"button","C");
  udobno=document.getElementById("td10");
  dobbuttonunar(udobno,"button","&#8730");
  udobno=document.getElementById("td11");
  dobbuttonunar(udobno,"button","exp");
  udobno=document.getElementById("td12");
  dobbuttonbinar(udobno,"button","9");
  udobno=document.getElementById("td13");
  dobbuttonbinar(udobno,"button","8");
  udobno=document.getElementById("td14");
  dobbuttonbinar(udobno,"button","7");
  udobno=document.getElementById("td15");
  dobbuttonbinar(udobno,"button","&#247");
  udobno=document.getElementById("td20");
  dobbuttonunar(udobno,"button","ln");
  udobno=document.getElementById("td21");
  dobbuttonunar(udobno,"button","lg");
  udobno=document.getElementById("td22");
  dobbuttonbinar(udobno,"button","4");
  udobno=document.getElementById("td23");
  dobbuttonbinar(udobno,"button","5");
  udobno=document.getElementById("td24");
  dobbuttonbinar(udobno,"button","6");
  udobno=document.getElementById("td25");
  dobbuttonbinar(udobno,"button","&#215");
  udobno=document.getElementById("td30");
  dobbuttonbinar(udobno,"button","&#8495");
  udobno=document.getElementById("td31");
  dobbuttonbinar(udobno,"button","&#120587");
  udobno=document.getElementById("td32");
  dobbuttonbinar(udobno,"button","1");
  udobno=document.getElementById("td33");
  dobbuttonbinar(udobno,"button","2");
  udobno=document.getElementById("td34");
  dobbuttonbinar(udobno,"button","3");
  udobno=document.getElementById("td35");
  dobbuttonbinar(udobno,"button","-");
  udobno=document.getElementById("td40");
  dobbuttonunar(udobno,"button","sin");
  udobno=document.getElementById("td41");
  dobbuttonunar(udobno,"button","cos");
  udobno=document.getElementById("td42");
  dobbuttonbinar(udobno,"button","0");
  udobno=document.getElementById("td43");
  dobbuttonbinar(udobno,"button",".");
  udobno=document.getElementById("td44");
  dobbutton(udobno,"button","=");
  udobno=document.getElementById("td45");
  dobbuttonbinar(udobno,"button","+");
  udobno=document.getElementById("td50");
  dobbuttonunar(udobno,"button","tg");
  udobno=document.getElementById("td51");
  dobbuttonunar(udobno,"button","ctg");
  udobno=document.getElementById("td52");
  dobbuttonunar(udobno,"button","arcsin");
  udobno=document.getElementById("td53");
  dobbuttonunar(udobno,"button","arccos");
  udobno=document.getElementById("td54");
  dobbuttonunar(udobno,"button","arctg");
  udobno=document.getElementById("td55");
  dobbuttonunar(udobno,"button","arcctg");
  ans.addEventListener('click',zapans);
  sign.addEventListener('click',zapsign);
  C.addEventListener('click',zapc);
  var buttons = form1.getElementsByClassName('mdl-button mdl-js-button mdl-button--raised mdl-button--colored');
  for (var i = 0; i < buttons.length; i++){
    if(buttons[i].id.indexOf('b')!=-1)
      buttons[i].addEventListener('click',zapbinar);
    else if(buttons[i].id.indexOf('u')!=-1)
        buttons[i].addEventListener('click',zapunar);
  }
  arg.addEventListener('change',fans);
  ans.addEventListener('click',fans);
}
create(0);