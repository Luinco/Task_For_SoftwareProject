// pages/index/index.js
Page({

    data: {
      points:"0",
      state:"0",
      time:"0",
      num1:"",
      num2:"",
      numStr:"0",
      sign:"",
      op:"",
      equals:"",
      pai:3.14,
      tri:""
    },
    clear(){
      this.setData({
        //define button"C" so that it
        //will reset the calculator
        numStr:"0",
        num1:"",
        num2:"",
        op:"",
        equals:"",
        sign:"",
        time:"0",
        state:"0"
      });
    },
    op(e){
      var v = e.currentTarget.dataset.op;
      // time=1 while number!=0，begin to figer.
      if(this.data.time=="1"&&this.data.numStr != "0"){
        var rs=0;
        var v1 = parseFloat(this.data.num1);
        var v2 = parseFloat(this.data.numStr);
        switch (this.data.op) {
          case "+":
            rs=v1+v2;
            break
         case"-":
         rs=v1-v2;
         break
         case"×":
         rs=v1*v2;
         break
         case"÷":
         if(v2==0){
           wx.showToast({
             title: 'Error',
             icon:'error'
           });
         }
         rs=v1/v2;
         break
          default:
            break;
        }
        this.setData({
          num1:rs,
          op:v,
          num2:"",
          numStr:"0"
        })
        return;
      }
      this.setData({
        op:v,
        num1:this.data.numStr,
        numStr:"0",
        points:"0",
        time:"1",
      })
    },
    cal(){
      if(!this.data.num1 || !this.data.numStr ||!this.data.op ){
        wx.showToast({
          title: 'Error',icon:'error'
        });
        return;
      };
      if(this.data.state=="1"){
        return;
      };
    var rs=0;
     var v1 = parseFloat(this.data.num1);
     var v2 = parseFloat(this.data.numStr);
     switch (this.data.op) {
       case "+":
         rs=v1+v2;
         break
      case"-":
      rs=v1-v2;
      break
      case"×":
      rs=v1*v2;
      break
      case"÷":
      if(v2==0){
        wx.showToast({
          title: 'Error',
          icon:'error'
        });
      }
      rs=v1/v2;
      break
       default:
         break;
     }
     this.setData({
       state:"1",
      num2 : this.data.numStr,
      numStr:rs,
      points:"0",
      equals:"=",
      time:"0"
     })
    },
    zero(e){
      var v = e.currentTarget.dataset.num;
      if(this.data.state=="1"){
        this.setData({
         num1:"",
         num2:"",
         op:"",
         numStr:0
        })
      };
        this.setData({
          numStr:this.data.numStr == "0" ?
          v : this.data.numStr + v
        });
    },
    numBtn(e){
     var v = e.currentTarget.dataset.num;
     if(this.data.state=="1"){
       this.setData({
        num1:"",
        num2:"",
        op:"",
        numStr:"0",
        equals:"",
        state:"0"
       })
     };
     this.setData({
        numStr:this.data.numStr == "0" ?
       v : this.data.numStr + v,
     });
    },
    del(){
      this.setData({
        numStr:this.data.numStr.length == 1 ?
        "0" : this.data.numStr.substring(0,this.data.numStr.length-1)
      });
    },
    point(){
      this.setData({
        numStr:this.data.points == "1" ?
        this.data.numStr : this.data.numStr + ".",
        points:"1"
     });
    },
    tri(e){
      if(this.data.state=="1"){
        return
      };
      var v = e.currentTarget.dataset.tri;
      var v1 = parseFloat(this.data.numStr);
      var rs =0;
      switch (v) {
        case "sin":
      rs=Math.sin(v1*(Math.PI/180));
          break
       case"cos":
       rs=Math.cos(v1*(Math.PI/180));
       break
       case"tan": 
       // Detect errors from fun tan
       if(v1%180 != 0&&v1%90==0){
        wx.showToast({
          title: 'Error',
          icon:'error',
        });
        return
      }
       rs=Math.tan(v1*(Math.PI/180));
       break
       case"ln":
       // Detect errors from fun ln
       if(v1 <= 0){
         wx.showToast({
           title: 'Error',
           icon:'error',
         });
         return
       }
       rs=Math.log(v1);
       break
        default:
          break;
      }
      this.setData({
        sign:v,
        num1:v1,
        numStr:rs.toFixed(3),
        equals:"=",
        state:"1"
      })
    }
  })