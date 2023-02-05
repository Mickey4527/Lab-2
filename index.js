var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L',];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var score = 0;

//ฟังก์ชั่น
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    //สุ่มลำดับ
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard()
{
    tiles_flipped = 0;
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    var output = '';
    var array_length = memory_array.length;

    memory_array.memory_tile_shuffle();
    for(var i = 0; i < array_length; i++){
        //ลำดับ tile ตามขนาดค่าของ memory_array,แสดงค่า memory_array,สุ่มตามค่า i
        output += '<div id="tile_'+ i +'" onclick="memoryFlipTile(this,\''+ memory_array[i] +'\')"></div>';
    }

    //ส่งค่า output -> เว็บ->ID->memory_borad
    document.getElementById('memory_board').innerHTML = output;
      
}

//ฟังก์ชั่นของ output,tile->this,val->memory_array
function memoryFlipTile(tile,val)
{
    //??
    if(tile.innerHTML == "" && memory_values.length < 2)
    {
        tile.style.background = '#FFF';
        tile.innerHTML = val;

        //??
        if(memory_values.length == 0)
        {
            memory_values.push(val)
            memory_tile_ids.push(tile.id)
        }
        else if(memory_values.length == 1)
        {
            memory_values.push(val)
            memory_tile_ids.push(tile.id)
            

            if(memory_values[0] == memory_values[1])
            {
                tiles_flipped += 2;
                score += 100;
                document.getElementById("score").innerHTML = "Score: " + score;
                memory_values = [];
                memory_tile_ids = [];
            
                if(tiles_flipped == memory_array.length){
                    alert("สุดยอด... เริ่มเล่นใหม่");
                    window.location.reload();
                }
            }
    
            else {

                function flip2Back(){
        
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(img/tile_bg.png) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(img/tile_bg.png) no-repeat';
                    tile_2.innerHTML = "";
             
                    memory_values = [];
                    memory_tile_ids = [];
                }
                    setTimeout(flip2Back, 500);
            }
        }
    }
}
