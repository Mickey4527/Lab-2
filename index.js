var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L',]; //ค่าของป้าย
var memory_values = []; //เก็บค่าป้ายที่เปิด
var memory_tile_ids = []; //เก็บค่าป้ายที่เปิด
var tiles_flipped = 0; //เก็บค่าป้ายที่เปิด
var score = 0; //คะแนน

//สุ่มลำดับ
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    //สุ่มลำดับ
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1)); //สุ่มตามค่า i
        temp = this[j]; //เก็บค่า
        this[j] = this[i]; //เก็บค่า
        this[i] = temp; //เก็บค่า
    }
}
//เรียกใช้ฟังก์ชั่น
function newBoard()
{
    //กำหนดค่าเริ่มต้น
    tiles_flipped = 0; 
    score = 0; 
    var output = ''; 
    var array_length = memory_array.length; //ความยาวของ memory_array

    //สุ่มลำดับ
    memory_array.memory_tile_shuffle();

    //สร้างป้าย
    for(var i = 0; i < array_length; i++){
        //ลำดับ tile ตามขนาดค่าของ memory_array,แสดงค่า memory_array,สุ่มตามค่า i
        output += '<div id="tile_'+ i +'" onclick="memoryFlipTile(this,\''+ memory_array[i] +'\')"></div>';
    }

    //ส่งค่า output -> เว็บ->ID->memory_borad
    document.getElementById('memory_board').innerHTML = output;
    document.getElementById("score").innerHTML = "Score: " + score;
      
}

//ฟังก์ชั่นของ output,tile->this,val->memory_array
function memoryFlipTile(tile,val)
{
    //เช็คค่า
    if(tile.innerHTML == "" && memory_values.length < 2)
    {
        tile.style.background = '#FFF';
        tile.innerHTML = val;

        //เปิดป้ายแรก
        if(memory_values.length == 0)
        {
            memory_values.push(val)
            memory_tile_ids.push(tile.id)
        }
        //เปิดป้ายที่สอง
        else if(memory_values.length == 1)
        {
            memory_values.push(val)      //เก็บค่า
            memory_tile_ids.push(tile.id)   //เก็บค่า
            
            //เปรียบเทียบค่า
            if(memory_values[0] == memory_values[1])
            {
                tiles_flipped += 2; //เพิ่มค่าเมื่อเปิดป้ายทั้งสอง
                score += 100; //เพิ่มคะแนน
                document.getElementById("score").innerHTML = "Score: " + score; //แสดงคะแนน
                memory_values = []; //เคลียค่า
                memory_tile_ids = []; //เคลียค่า
            
                //ถ้าเปิดทั้งหมด
                if(tiles_flipped == memory_array.length){
                    alert("สุดยอด... เริ่มเล่นใหม่");
                    window.location.reload();
                }
            }
            
            //ถ้าไม่เปิดทั้งหมด
            else {

                function flip2Back(){
                    
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(img/tile_bg.png) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(img/tile_bg.png) no-repeat';
                    tile_2.innerHTML = "";
             
                    memory_values = []; //เคลียค่า
                    memory_tile_ids = []; //เคลียค่า
                }
                    setTimeout(flip2Back, 500); //เรียกใช้ฟังก์ชั่น flip2Back หลังจาก 500 มิลลิวินาที
            }
        }
    }
}

function countDown(secs, elem) { //เวลา,element
    var element = document.getElementById(elem); //เรียกใช้ ID ของ element
    element.innerHTML = "Time: " + secs + " seconds"; //แสดงค่าเวลา

    if (secs < 1) { //ถ้าเวลาหมด
        clearTimeout(timer); //หยุดเวลา
        //element.innerHTML = '<div><h2>Time out</h2>';   //แสดงข้อความ
        //element.innerHTML += '<a href="index.html">Play Again</a></div>'; //แสดงปุ่ม
        alert('หมดเวลาแล้ว เริ่มเกมใหม่');
		window.location.reload();
        return;
    }
    secs--; //ลดค่าเวลา
    var timer = setTimeout('countDown(' + secs + ',"' + elem + '")', 1000); //เรียกใช้ฟังก์ชั่น countDown หลังจาก 1000 มิลลิวินาที
}

