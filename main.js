window.onload = init 
function init(){
    let form=document.getElementById('form-tinh')
    form.onsubmit=formTinhSubmitHandler
    form.onreset = ()=>{
        setText('currentName','')
        setText('RMR','')
        setText('AMR','')
        setText('resultEX','')
        setText('TMR','')
        setText('CLKD','')

    }
    function formTinhSubmitHandler(){
        event.preventDefault()
        //1.Get infor
        let tinhInfor={
           currentName : form.currentName.value,
           sex : form.sex.value,
           age : form.age.value,
           weight : form.weight.value,
           height : form.height.value,
           ex : form.ex.value,
           dream : form.dream.value
        }
        //2. validate Infor
        let validateResult=[
            validate(tinhInfor.currentName,'name-error',"Vui lòng nhập tên!"),
            validate(tinhInfor.sex,'sex-error',"Vui lòng nhập đúng giới tính nam hoặc nữ!"),
            validate(tinhInfor.age && tinhInfor.age>0 ,'age-error','Vui lòng nhập tuổi'),
            validate(tinhInfor.weight && tinhInfor.weight>0,'weight-error','Vui lòng nhập cân nặng'),
            validate(tinhInfor.height && tinhInfor.height>10,'height-error','Vui lòng nhập đúng chiều cao!'),
            validate(tinhInfor.ex && tinhInfor.ex>=0,'ex-error',"Vui lòng nhập năng lượng tập thể dục!"),
            validate(tinhInfor.dream,'dream-error','Vui lòng nhập mong muốn của bản thân!')
        ]           
        if(allPassed(validateResult)){
            let chiSo ={
                RMR : 9.99*tinhInfor.weight + 6.25*tinhInfor.height - 4.92*tinhInfor.age+5,
                AMR : 0,
                EX : tinhInfor.ex,
                TMR : 0,
                CLKD : 0
            }
            if(tinhInfor.sex==='nam'){
                chiSo.AMR = chiSo.RMR/100*30;
            } else{
                chiSo.AMR = chiSo.RMR/100*25;
            }
            chiSo.TMR=Number(chiSo.RMR + chiSo.AMR + chiSo.EX)
            if (tinhInfor.dream === 'Giữ cân'){
                chiSo.CLKD = chiSo.TMR
            } else if(tinhInfor.dream === 'Giảm cân'){
                if(tinhInfor.age<40){
                    chiSo.CLKD=chiSo.TMR-500;
                } else{
                    chiSo.CLKD=chiSo.TMR-300
                }
            } else {
                if(tinhInfor.age<40){
                    chiSo.CLKD=chiSo.TMR+500;
                } else{
                    chiSo.CLKD=chiSo.TMR+300
                }
            }
            setText('currentName',tinhInfor.currentName.toUpperCase())
            setText('RMR',chiSo.RMR)
            setText('AMR',chiSo.AMR)
            setText('resultEX',chiSo.EX)
            setText('TMR',chiSo.TMR)
            setText('CLKD',chiSo.CLKD)
        }
    }    
    setText = function(id,text){
        document.getElementById(id).innerText=text
    }
    validate= function(condition,idErrorTag,messageError){
        if(condition){
            setText(idErrorTag,'')
            return true
        } else{
            setText(idErrorTag,messageError)
            return false
        }
    }
    disable= function(id){
        document.getElementById(id).setAttribute("disabled",true)
    }
    enable = function(id){
        document.getElementById(id).removeAttribute("disabled")
    }
    function allPassed(validateResult){
        for(let result of validateResult){
            if (!result){
                return false
            }
        }
        return true
    }
}