
//Optional - if using in the demo form
function getIPs(){
    
    let subnet = document.forms["myForm"]["subnet"].value; 
    let type= document.forms["myForm"]["type"].checked; 
       let ips=[];
       let ip="";
        if (type){
           ips=getIPsFromCIDR(subnet,"addresses");              
           ips.forEach(resultsprint)
           function resultsprint(ip) {
                        document.getElementById('IPs').innerHTML += "<br/>"+ip;
            }
        }
       else{
            
           highlights=getIPsFromCIDR(subnet,"highlights"); 
           
             document.getElementById('IPs').innerHTML += "<br/>"+highlights;
       }
 
}


//getIPsFromCIDR will generate an array of IP addresss from a provided CIDR Range - call it with a type of "Addresses" and it will return an array

function getIPsFromCIDR(net,type) {
     		console.log(type) 
                let ipAddresses=[];
                const regexp= /^(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\/(\d{1,2})$/;
                const match=net.match(regexp);
                let a=`${match[1]}`;
                let b=`${match[2]}`;
                let c=`${match[3]}`;
                let d=`${match[4]}`;
                    
                let mask=`${match[5]}`;
                let octetmod=mask%8;
                let octetnumber=Math.floor(mask/8);
                let ipaddress="";
                let octet="";
                
                if (mask<=8)
                {
                    octetnumber=0;
                }
                
                if (octetnumber==3){
                  octet=d;
                }
                else if (octetnumber==2){
                  octet=c;
                }
                else if (octetnumber==1){
                  octet=b;
                }
                else if (octetnumber==0){
                  octet=a;
                }
                         
            
                block=(2**(8-octetmod));
                numberofblocks=Math.floor(octet/block);
                console.log(`numberofblocks=${numberofblocks} octectmod=${octetmod} mask=${mask} octect=${octet} block=${block}`)
                network=block*numberofblocks;
                firsthost=network+1;
                broadcast=network+(block-1);
                //Fourth octet
                if (octetnumber==3){         
                    console.log(`octectnumber=${octetnumber} firsthost=${firsthost} network=${network} broadcast=${broadcast}`)           
                    for (i=firsthost;i<broadcast;i++){
                            ipaddress=`${a}.${b}.${c}.${i}`; 
                            ipAddresses.push(ipaddress);   
                        }
		    networkAdd=`${a}.${b}.${c}.${network}`
		    broadcastAdd=`${a}.${b}.${c}.${broadcast}`
                }
                //Third octet
                else if (octetnumber==2){
                    console.log(`octectnumber=${octetnumber} firsthost=${firsthost} network=${network} broadcast=${broadcast}`)
                    for (i=network;i<=broadcast;i++){
                        for (j=0;j<255;j++){
                            ipaddress=`${a}.${b}.${i}.${j}`;                      
                            ipAddresses.push(ipaddress);                         
                        }
                    }
                    networkAdd=`${a}.${b}.${network}.0`
                    broadcastAdd=`${a}.${b}.${broadcast}.255`
                }
                //Second octet
                else if (octetnumber==1){
                    console.log(`octectnumber=${octetnumber} firsthost=${firsthost} network=${network} broadcast=${broadcast}`)
                    for (i=network;i<broadcast;i++){
                        for (j=0;j<255;j++){
                            for (k=0;k<255;k++){
                            ipaddress=`${a}.${i}.${j}.${k}`;
                            ipAddresses.push(ipaddress);
                        }
                        }
                    }
                    networkAdd=`${a}.${network}.0.0`
                    broadcastAdd=`${a}.${broadcast}.255.255`
                }
                //First octet
                else if (octetnumber==0){  
                    console.log(`octectnumber=${octetnumber} firsthost=${firsthost} network=${network} broadcast=${broadcast}`)                  
                    for (i=network;i<broadcast;i++){
                        for (j=0;j<255;j++){
                            for (k=0;k<255;k++){
                                for (l=0;l<255;l++){                                
                                ipaddress=`${i}.${j}.${k}.${l}`;
                                ipAddresses.push(ipaddress);
                                }   
                            }
                        }
                    }
	            networkAdd=`${network}.0.0.0`
                    broadcastAdd=`${broadcast}.255.255.255`
                }
    
        if (type=="addresses"){
            return ipAddresses
        }
        else if (type=="highlights"){
            return `IP=${net} Network=${networkAdd} Broadcast=${broadcastAdd}`; 
        }
            
    
}
