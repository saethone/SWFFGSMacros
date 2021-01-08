let d = new Dialog({
    title: "Hyperspace Calculator",
    content:'<div>Grids Across Major Lane: <input name="major" class="major" style="width:40%" type="text" value="0" data-dtype="String" /></div><div>Grids Across Minor Lane: <input name="minor" class="minor" style="width:40%" type="text" value="0" data-dtype="String" /></div><div>Grids Across no lane: <input name="nolane" class="nolane" style="width:40%" type="text" value="0" data-dtype="String" /></div><div>Hyperdrive Class: <input name="hclass" class="hclass" style="width:40%" type="text" value="1" data-dtype="String" /></div><div>Silhouette: <input name="sil" class="sil" style="width:40%" type="text" value="1" data-dtype="String" /></div><div>Negotiation Ranks: <input name="neg" class="neg" style="width:40%" type="text" value="0" data-dtype="String" /></div><div>Faster Trip? (3 Advantage): <input id="faster" name="faster" class="faster" style="width:40%" type="checkbox" data-dtype="String" /></div>',
    buttons: {
     one: {
      icon: '<i class="fas fa-check"></i>',
      label: "Calculate",
      callback: (html) => {
         let major;
         major =(parseInt(html.find(".major").val(), 10));
         if (isNaN(major)) {major = 0;}
         let minor;
         minor =(parseInt(html.find(".minor").val(), 10));
         if (isNaN(minor)) {minor = 0;}
         let nolane;
         nolane =(parseInt(html.find(".nolane").val(), 10));
         if (isNaN(nolane)) {nolane = 0;}
         let hclass;
         hclass =(parseInt(html.find(".hclass").val(), 10));
         if (isNaN(hclass)) {hclass = 1;}
         let sil;
         sil =(parseInt(html.find(".sil").val(), 10));
         if (isNaN(sil)) {sil = 1;}
         let neg;
         neg =(parseInt(html.find(".neg").val(), 10));
         if (isNaN(neg)) {neg = 0;}
         let faster;
         if (html.find('#faster')[0].checked) {faster = 1;} else {faster = 0;}
         console.log ("faster: "+ faster);
         
         let time;
         time = (major * hclass) + (minor * (hclass * 1.5)) + (nolane * (hclass * 2));
         if (faster == 1) {time = time * .75;}

         let docking;
         docking = sil * 50;

         let operating;
         operating = sil * time * sil;
        
         let fee;
         fee = docking + operating;

         if (neg>0) {fee=fee - ((neg*.05) * fee);}

         time = Math.round(time * 10) / 10;
         fee = Math.round(fee);

         let message;
         let chatData;
         message = '<div>The Trip will take <span style="font-weight:bold; background:#FFFF99">' + time + '</span> Days. Thats <span style="font-weight:bold; background:#FFFF99">' + fee + '</span>credits for the trip.</div>';
         chatData = { 
             user:game.user.id,
             speaker:game.user,
             content:message
         };
         ChatMessage.create(chatData, {});
       }
     },
 two: {
    icon: '<i class="fas fa-times"></i>',
    label: "Cancel",
    callback: () => console.log("Closed Credits")
     }   
   },
   default: "two",
   close: () => console.log("This always is logged no matter which option is chosen")
 });
 d.render(true);
