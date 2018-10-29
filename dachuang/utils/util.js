  function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function timestampTotime(uTime) {
    var myDate = new Date(uTime * 1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    return [year, month, day].map(formatNumber).join('-');
};

module.exports = {
  timestampTotime:timestampTotime
}

function json2Form(json) {
      var str = [];
      for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
      }
      return str.join("&");
    }

function isEmpty(content){
   if(content==""){
     console.log("我被调用了");
     wx.showModal({
       title: '提示',
       content: '这是一个模态弹窗',
       success: function (res) {
         if (res.confirm) {
           console.log('用户点击确定')
         }
       }
     }) 
   }
}
    
module.exports = {
  json2Form: json2Form,
  isEmpty:isEmpty,
} 
