export function getpersistentUUID(productName){
  try{
  let storedUUIDs = JSON.parse(localStorage.getItem("productUUIDs"))||{};
if(!storedUUIDs[productName]){
  storedUUIDs[productName]=generateUUID();
  localStorage.setItem("productUUIDs",JSON.stringify(storedUUIDs));
}
return storedUUIDs[productName];
} catch(error){
  console.error("UUID generation failed:",error);
return generateUUID();
  }
}


export function generateUUID(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
