$(function() {
var myObj =`
    <script language=\"javascript\" type=\"text/javascript\" >
        function myClosebtn() {
            var sep = ",";
            
            var lsStr =  localStorage.getItem("tvOrder") ;
            var closeVal = $("[class^=valueValue]").slice(4, 5).text(); 
            
            var target1 = document.getElementById("myTradeOutput1").value;
            var buyArray = target1.split(sep);
            var baLen = buyArray.length;

            for(let i = 0; i < baLen -1; i++){
                if( lsStr == null){
                    lsStr ="buy," +  buyArray[i] + "," + closeVal ;
                }
                else{
                    lsStr = lsStr + "\\n" + "buy," + buyArray[i] + "," + closeVal ;
                }
            }


            var target2 = document.getElementById("myTradeOutput2").value;
            var sellArray = target2.split(sep);
            var seLen = sellArray.length;


            for(let i = 0; i < seLen - 1; i++){
                if(lsStr == null){
                    lsStr =　"sell," +  sellArray[i]+ "," + closeVal ;
                }
                else{
                    lsStr = lsStr + "\\n" + "sell," + sellArray[i]+ "," + closeVal ;
                }
            }
            if(lsStr == null){

            }
            else{
                localStorage.setItem("tvOrder", lsStr); 
            }
            console.log(lsStr);

            
            document.getElementById("myTradeOutput1").value = "";
            document.getElementById("myTradeOutput2").value = "";
            document.getElementById("buyCount").innerText = "0";
            document.getElementById("sellCount").innerText = "0";

            document.getElementById("saveBtn").hidden = false;

        }

        function mySellbtn() {
            console.log(\'sell,\' + $("[class^=valueValue]").slice(4, 5).text()); 
            var target = document.getElementById("myTradeOutput2").value;
            target= target + $("[class^=valueValue]").slice(4, 5).text()+ ",";
            document.getElementById("myTradeOutput2").value = target;

            
            var counter = document.getElementById("sellCount").innerText;
            var total = parseInt(counter) + 1;
            document.getElementById("sellCount").innerText = total;
        }

        function myBuybtn() {
            console.log(\'buy,\' + $("[class^=valueValue]").slice(4, 5).text()); 
            var target = document.getElementById("myTradeOutput1").value;
            target = target + $("[class^=valueValue]").slice(4, 5).text()+ ",";
            document.getElementById("myTradeOutput1").value = target;

            
            var counter = document.getElementById("buyCount").innerText;
            var total = parseInt(counter) + 1;
            document.getElementById("buyCount").innerText = total;
        }

        function myDataSave() { 
            var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
            var content = localStorage.getItem("tvOrder");
            var blob = new Blob([ bom, content ], { "type" : "text/csv" });

            if (window.navigator.msSaveBlob) { 
                window.navigator.msSaveBlob(blob, "tester.csv"); 

                // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
                //window.navigator.msSaveOrOpenBlob(blob, "test.csv"); 
            } else {
                document.getElementById("saveBtn").href = window.URL.createObjectURL(blob);
            }

            localStorage.removeItem("tvOrder");

            document.getElementById("saveBtn").hidden = true;
        }
    </script>
    <input type="button" value="Sell" onclick=\"mySellbtn()\"/>
    <input type="button" value="Buy" onclick=\"myBuybtn()\"/>
    <input type="button" value="AllClose" onclick=\"myClosebtn()\"/>
    <a href="#" download="tester.csv" type="button" value="SAVE" onclick=\"myDataSave()\"  id="saveBtn" hidden >download </a>
    buy:<pq id="buyCount">0</pq> -sell:<pq id="sellCount">0</pq> <input  id="myTradeOutput1" type="hidden" value="" ></input><input  id="myTradeOutput2" value=""  type="hidden"></input>
`;

//もろもろ配置
$("body").prepend($(myObj));

    });

