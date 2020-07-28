class Food{

    constructor(foodStock, lastFed){
        this.image = loadImage("Milk.png")
        this.foodStock = foodStock
        this.lastFed = lastFed
        database = firebase.database();
        
    }

    getFoodStock(){  
        database.ref('Food').on("value",function(data){
            foodStock = data.val()
        })

        return foodStock    
    }

    updateFoodStock(foodStock){
     
          database.ref('/').update({
            Food: foodStock, 
            FeedTime: hour()
          })

    }

    getLastFedTime(){  
        var fedTime

        database.ref('FeedTime').on("value",function(data){
            fedTime = data.val()
        })

        return fedTime    
    }

        
    display(){
        var x= 80, y=100;

        imageMode(CENTER);
        
        this.foodStock = foodStock;

        if(this.foodStock!=0){
            for(var i =0; i<this.foodStock;i++){
                if(i%10===0){
                    x = 80
                    y = y+50
                }
                image(this.image,x,y,50,50)
                x=x+30;
             }
        }

        if(isFed === true){
           /* for(x; x<450; x = x+10){
                //background("green")
               image(this.image,x,300,50,50)
               
            }*/
            x = 440
            image(this.image,x,300,50,50)
        }
    }

    bedroom(){
        background(bedroom,550,500)
    
    }

    garden(){
        
        background(garden,550,500)
       
    }

    washroom(){
        background(washroom,550,500)
    }

    
}