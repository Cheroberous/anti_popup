





const debug=0;
var lista_vive=[]; 
var dictionary = {};                 // id: url
pagina_interessata_attiva=0;
var voluta=1;
const s_anime="https:\/\/www\.animeunity\.[a-zA-Z0-9]*\/[a-zA-Z0-9]*";
const s_serie="https:\/\/streamingcommunity\.[a-zA-Z0-9]*\/[a-zA-Z0-9]*";



   
async function do_your_thing() {


    if(voluta==1){
        if(debug)console.log("plug-in attivo quindi opero");
        var sanity_check=0;
        

        lista_vive=await chrome.tabs.query({ currentWindow: true});                  // get list "active" tabs
        for(const elem of lista_vive){
            //if(debug)console.log("id: ",elem.id," e url: ",elem.url);
            const str1 = elem.id.toString();
            dictionary[str1]=elem.url;   
            
        }

        //if(debug)console.log(dictionary);




        chrome.tabs.onCreated.addListener(function (tab) {

            //if(debug)console.log("aperta nuovatab, interessata attiva: ",pagina_interessata_attiva);

            const identificativo=tab.id;
            const dove_vuole_andare = tab.pendingUrl;
            const url = tab.url;

        

            const str = identificativo.toString();
            dictionary[str]=tab.pendingUrl;                                             //update dictionary 
            


            //if(debug)console.log("qui sotto url");
            //if(debug)console.log("url nuova pagina: ",dove_vuole_andare);
            //if(debug)console.log("url : ",url);
            //if(debug)console.log("tab id ",identificativo);
            //if(debug)console.log("titolo:", tab.title);



            
            
            if(dove_vuole_andare!=undefined && (dove_vuole_andare.match(s_anime) || (dove_vuole_andare.match(s_serie)))){      

                //if(debug)console.log("pagina animeunity/streamingcommunity, si va in scena");
                pagina_interessata_attiva=1;
                //if(debug)console.log(pagina_interessata_attiva);

            }

            if(pagina_interessata_attiva === 1 && dove_vuole_andare == undefined){
                //if(debug)console.log("rimuovo pop up");
                chrome.tabs.remove(identificativo,()=>{});
            
            }


        });         
        

        chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){              
            
            // if(debug)console.log("registrato cambiamento");
            
            if(pagina_interessata_attiva!=1){

                
                const ident=tabId;          
                const new_url=tab.url;
                const str=ident.toString();

                //const new_url1=tab.pendingUrl;     
                
                //if(debug)console.log("id: ",ident," e url: ",new_url);
                



                if(new_url.match(s_anime) || new_url.match(s_serie)){

                    if(dictionary[str]!=null && dictionary[str]!=new_url){
                        
                        //if(debug){console.log("ho usato una pagina google/già esstente per cercare animeunity");}
                        pagina_interessata_attiva=1;

                    }
                
                }
                

                dictionary[str]=new_url;         
                
                //if(debug)console.log("pagina interessata attiva == ",pagina_interessata_attiva);

            }

        });







        chrome.tabs.onActivated.addListener(function(activeInfo){            

            
            if(pagina_interessata_attiva!=1){

                const ident=activeInfo.tabId;
                const str=ident.toString();
                const url_associato= dictionary[str];

                //if(debug)console.log("id associato alla pagina cliccata == ",ident);
                //if(debug)console.log("url associato alla pagina cliccata == ",url_associato);

                if(url_associato.match(s_anime) || url_associato.match(s_serie)){
                    pagina_interessata_attiva=1;
                    //if(debug)console.log("pagina interessata attiva == ",pagina_interessata_attiva);
                }
             
            }

        });
        

        chrome.tabs.onRemoved.addListener(function(tabId,removeInfo){         

            //if(debug)console.log("eliminata pagina");
            if(pagina_interessata_attiva===1){

                
                const str=tabId.toString();
                const url_associato= dictionary[str];

                delete dictionary[str];

                if(url_associato.match(s_anime) || url_associato.match(s_serie)){
                    pagina_interessata_attiva=0;
                    //if(debug)console.log("pagina interessata attiva == ",pagina_interessata_attiva);
                }



            }


        });




    }
    else{if(debug)console.log("plug-in offline");}
}
 


do_your_thing();

