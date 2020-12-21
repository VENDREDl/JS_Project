// 세자리마다 콤마 찍어주는 함수
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let str = [];

function add(char){
    let display = document.getElementById("phone_input");
    display.value = display.value + char;
    
    
    // 전화번호 하이픈 형식으로 변경
    if(display.value.length > 10){
        let num = display.value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
        display.value = num;
    }
}


function reset(){
    let display = document.getElementById("phone_input");
    display.value = "";
    
}

function c(){
    let display = document.getElementById("phone_input");
    
    display.value = display.value.substr(0, display.value.length -1);
    
}

function removeComma(str)
	{      
        if (str != null){
            n = parseInt(str.replace(/,/g,""));

            return n;
        }
    }
    
function removeComma1(str)
	{      
        if (str != null){
            n1 = parseInt(str.replace(/,/g,""));
            
            return n1;
        }
    }
    
    function removeComma2(str)
	{      
        if (str != null){
            n2 = parseInt(str.replace(/,/g,""));
            
            return n1;
        }
    }
    
    function removeComma3(str)
	{      
        if (str != null){
            n3 = parseInt(str.replace(/,/g,""));
            
            return n1;
        }
    }

    
   

$(document).ready(function(){

    
    // Amount에 금액 표시
    $("#check").click(function(){
        let random = parseInt(Math.random()*(100 - 1) + 1);
        let test = parseInt(random + "000");
        $(".amount_input").val(numberWithCommas(test));
        $(".amount_input").attr("disabled", true);
        $(this).attr("disabled", true);
        $('.notice').text('2. 전화번호를 입력해주세요!')
    })

    // Amount와 Phone Number의 Value값 초기화
    $("#cancel").click(function(){
        $(".amount_input").val("");
        $(".amount_input").attr("disabled", false);
        $("#check").attr("disabled", false);
        $("#phone_input").val("");
        $("#phone_input").attr("disabled", false);
        $(".notice").text(``);
        $(".notice1").text(``);
        $(".notice2").text(``);
    })

    $("#phone_input").click(function(){
        $(".keypad").addClass("appear")
        $(".keypad").removeClass("disappear")
        $(this).attr("disabled", true);
        $('.notice').text('3. Save 버튼을 눌러 마일리지를 적립해주세요!')   
        $('.notice1').text('4. Cancle 버튼을 눌러 새롭게 저장할수있습니다!') 
    })

    $("#back").click(function(){
        $(".keypad").addClass("disappear")
        $(".keypad").removeClass("appear")       
    })

    //---------------------------------------------------------------------------//
    //웹페이지 새로고침 시 작동 부분 [시작]
    //---------------------------------------------------------------------------//

    $('.notice').text('1. Check 버튼을 눌러 마일리지를 설정해주세요!')

    // 페이지 새로고침 후 LocalStorage에 값이 없으면 생기는 오류 방지
    
    let testarr = ['0'];
    let testarr2 = ['010-0000-0000'];
    let testarr3 = ['2020년 12월 16일']

    if(!localStorage.getItem("010-0000-0000")){
        localStorage.setItem("010-0000-0000", "0");
        localStorage.setItem("010-0000-00001", "1");
        localStorage.setItem("010-0000-00002", JSON.stringify(testarr));
        localStorage.setItem("010-0000-00003", JSON.stringify(testarr3));
        localStorage.setItem("010-0000-00004", JSON.stringify(testarr));
        localStorage.setItem("member", JSON.stringify(testarr2));
    }
      
    // 값을 저장할 배열 초기화  
    let array = [];
    let psave = [];
    let ptime = [];
    let test = [];

    // 페이지 새로고침 후 배열이 초기화 되기 때문에 LocalStorage에서 값을 가져와 배열에 저장 [시작]
    let output = localStorage.getItem("member");
    var phonearr = JSON.parse(output);
    let count = 1;
    let test1 = [];
    for (const item of phonearr) {
        var insertTr = "";
        insertTr += "<tr>"
        insertTr += `<td id="num${count}" class="no">${item} </td>`
        insertTr += "</tr>"

        test1.push(`num${count}`);
        console.log(test1);
        count++;
        $("#myTbody").append(insertTr);
    }        

    for (const i of phonearr) {   
        array.push(i);
    }

    for (const i of test1) {
        let getText4 = $('#' + i).text() + 4;
        let text4 = getText4.replace(/(\s*)/g, "");
        

        let getPn = localStorage.getItem(text4);
        let getPn1 = JSON.parse(getPn);
        
            for (const j of getPn1) {
                psave.push(j);
            }
            
        console.log(getPn1)
    }

    for (const i of test1) {
        let getText3 = $('#' + i).text() + 3;
        let text3 = getText3.replace(/(\s*)/g, "");

        let getPd = localStorage.getItem(text3);
        let getPd1 = JSON.parse(getPd);
        for (const k of getPd1) {
            ptime.push(k);
        }
    }

    // 배열 초기값 저장 [종료]

    //---------------------------------------------------------------------------//   
    // 웹페이지 새로고침 시 작동 부분 [종료]
    //---------------------------------------------------------------------------//



    //---------------------------------------------------------------------------//
    //SAVE 버튼 클릭 시 작동 부분 [시작]
    //---------------------------------------------------------------------------//


    $("#save").click(function(){
      
        // 저장할 값들을 불러오는 변수 선언 
        let amountInfo = $(".amount_input").val(); // 금액 
        let phoneInfo = $("#phone_input").val(); // 전화번호 
        let phoneCount = $("#phone_input").val() + 1; // 적립 횟수        
        let phoneSave = $("#phone_input").val() + 2; // 전화번호들을 저장
        let phoneTime = $("#phone_input").val() + 3; // 적립 시간 정보 저장         
        let saveData = $("#phone_input").val() + 4; 
        var saveInfo = [];
        let arr = []; 


        let today = new Date();   

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let date = today.getDate();  // 날짜
        let day = today.getDay();  // 요일
        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분
        switch (day){
            case 1:
                day = '월';
                break;
            case 2:
                day = '화';
                break;
            case 3:
                day = '수';
                break;
            case 4:
                day = '목';
                break;
            case 5:
                day = '금';
                break;
            case 6:
                day = '토';
                break;
            default:
                day = '일';
        }
        let time = `${year}년  ${month}월  ${date}일  ${day}요일 ${hours}시 ${minutes}분`;
        let time1 = `${month}월  ${date}일  ${day}요일 ${hours}시${minutes}분`;
        $("#phone_input").attr("disabled", true);
        saveInfo.push(amountInfo, phoneInfo, time);

        console.log(saveInfo)

        $(".notice").text(`${saveInfo[1]} / 마일리지 ${saveInfo[0]} 적립`);
        $(".notice1").text(`일시 ${saveInfo[2]}`);
       
        let count = 1;
       
        removeComma(localStorage.getItem(phoneInfo)); // return값 n
        removeComma1($(".amount_input").val()); // return값 n1
        removeComma2(localStorage.getItem(phoneCount)); // return값 n2
        
        arr.push(phoneInfo, amountInfo, count)
  
        if(!localStorage.getItem(phoneInfo)){ // LocalStorage에 해당 전화번호가 없으면 실행
            
            psave = [];
            ptime = [];

            localStorage.setItem(phoneInfo, amountInfo); // 전화번호에 적립 금액 저장
             
            array.push(phoneInfo); // array배열에 전화번호 추가
            psave.push(amountInfo); // psave배열에 금액 추가
            ptime.push(time1); // ptime배열에 시간 정보 추가

            localStorage.setItem("member", JSON.stringify(array)); // LocalStorage에 전화번호 저장
            localStorage.setItem(phoneSave, JSON.stringify(psave)); // LocalStorage에 금액 저장
            localStorage.setItem(phoneTime, JSON.stringify(ptime)); // LocalStorage에 시간 정보 저장
            localStorage.setItem(saveData, JSON.stringify(psave)); 
            
            let i = numberWithCommas(localStorage.getItem(phoneInfo)); // 금액에 콤마 찍어줌

            if(!localStorage.getItem(phoneCount)){ // LocalStorage에 적립 횟수가 없으면
                let count = 1;
                localStorage.setItem(phoneCount, count); // 적립횟수 = 1
                $(".notice2").text(`총 마일리지 ${i} 적립횟수 ${count}`); // 적립 횟수를 화면에 띄움
            }
            else{
                let cc = n2 + 1; // 적립횟수 + 1
                localStorage.setItem(phoneCount, cc);
                $(".notice2").text(`총 마일리지 ${i} 적립횟수 ${cc}`);
            }         
        }
        else { // LocalStorage에 전화번호 있으면      
           
            let cal = n + n1; // 금액 더하기
            localStorage.setItem(phoneInfo, cal); // 더한 금액값을 LocalStorage에 저장 
            let j = numberWithCommas(localStorage.getItem(phoneInfo)); 
            psave.push(amountInfo);
            ptime.push(time1);
            console.log(psave)
            localStorage.setItem(phoneSave, JSON.stringify(psave));
            localStorage.setItem(phoneTime, JSON.stringify(ptime))
            localStorage.setItem(saveData, JSON.stringify(psave));
            
            if(!localStorage.getItem(phoneCount)){
                let count = 1;
                localStorage.setItem(phoneCount, count);
                $(".notice2").text(`총 마일리지 ${j} 적립횟수 ${count}`);
            }
            else{
                let cc = n2 + 1;
                localStorage.setItem(phoneCount, cc);
                $(".notice2").text(`총 마일리지 ${j} 적립횟수 ${cc}`);
            }

            
        }     
            
    })

    //---------------------------------------------------------------------------//
    //SAVE 버튼 클릭 시 작동 부분 [종료]
    //---------------------------------------------------------------------------//

})
        $("#resetbtn").click(function(){

            $("#myTbody").empty();

            let output = localStorage.getItem("member");
            var phonearr = JSON.parse(output);
            let count = 1;
            for (const item of phonearr) {
                var insertTr = "";
                insertTr += "<tr>"
                insertTr += `<td id="num${count}" class="no">${item} </td>`
                insertTr += "</tr>"

                count++;
                $("#myTbody").append(insertTr);
            }        
        })
        
        $('.admin_').click(function(e){
            
            $("#myTbody2").empty();
            $("#myTbody3").empty();
            var id = e.target.getAttribute('id');
            if ( ( id != '') && (id != null)){

            let phoneDetail = $('#' + id).text()+2;
            let phoneDetail1 = phoneDetail.replace(/(\s*)/g, "");
            let getphoneValue = localStorage.getItem(phoneDetail1);
            let phoneDetail2 = $('#' + id).text()+3;
            let phoneDetail22 = phoneDetail2.replace(/(\s*)/g, "");
            let getphoneValue2 = localStorage.getItem(phoneDetail22);
            let phoneValueArr = JSON.parse(getphoneValue);
            let phoneValueArr2 = JSON.parse(getphoneValue2);

            for (const i of phoneValueArr) {
                var insert = "";
                insert += "<tr>"
                insert += `<td>${i}</td>`
                insert += "</tr>"

               $("#myTbody2").append(insert);
      
            }

            for (const it of phoneValueArr2) {
                var ins = "";
                ins += `<tr>`
                ins += `<td>${it}</td>`
                ins += "</tr>"
                $("#myTbody3").append(ins);
            }            
        }           
        });

    $('.adminbtn').click(function(){
        var result = prompt('관리자 비밀번호', '비밀번호를 입력하세요...');
        console.log(result);

        if(result != 'admin'){
            alert('비밀번호 오류')
        }
        else {
            $('#admin').addClass("appear");
            $('#admin').removeClass("disappear");
        }

       $('.amount_input') 
       
        
    })

        

