function chatbot(name){
  this.name=name;
  this.states=[];
  this.state="default";

  this.transitions=[];
  this.reply=function(input){
    var output="";
    var end="false";
    if(input==null||input==""){
      output="";
    }else{
      for(var key in this.states[this.state].replies){
          input=input.toLowerCase();
          var words=key.split(",");
          words.sort();
          var contains=words.length;
          for(var i=0;i<words.length;i++){
            if(input.indexOf(words[i])!=-1){
              contains--;
            }
          }
          if(contains<=0){
            output=this.states[this.state].replies[words][Math.floor(Math.random()*this.states[this.state].replies[words].length)];
            if(this.states[this.state].transitions[key]!=null){
              this.state=this.states[this.state].transitions[key];
               console.log(this.states[this.state].replies["default"]);
              output+="\n"+this.states[this.state].replies["default"][Math.floor(Math.random()*this.states[this.state].replies["default"].length)];
            }
          }



      }
    }
    if(output==""){
      output=this.states[this.state].replies["n/a"];
    }
    return output;
  }
  this.addstate=function(name){
    this.states[name]=new state();
  }
  this.addreply=function(state,key,msg,transition){
        key.sort();
        this.states[state].replies[key]=msg;
        this.states[state].transitions[key]=transition;
  }
  this.addmsg=function(state,msg){
    this.states[state].msg=msg;
  }
  function state(){
    this.replies={"n/a":["Not sure how to help with that."],"default":[""]};
    this.transitions={"n/a":null,"default":null};
  }
  this.see=function(){
    console.log(this.states);
  }
  this.addstate("default");
  this.addreply("default",["default"],["Hello there, I am "+name+". How can I help you?"]);
}
