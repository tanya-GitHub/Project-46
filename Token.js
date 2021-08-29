class Token {
    constructor(){
      this.index = null;
      this.team = null;
    }
  
    changePosition(){
      var tokenIndex = "teams/token" + this.index;
      database.ref(tokenIndex).set({
          
        distance:this.distance
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
  
    getCarsAtEnd(){
      database.ref('carsAtEnd').on("value", (data)=>{
        this.rank = data.val();
      })
    }
  
    //static calls for an entire class, not a particular object
    // we use static because we don't know which car will reach first
    static updateCarsAtEnd(rank){
      database.ref('/').update({
        carsAtEnd: rank
      });
    }
  }
  