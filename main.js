window.onload = init 
function init(){
    let form=document.getElementById('form-tinh')
    form.onsubmit=formlogInSubmitHandler
    function formlogInSubmitHandler(){
        event.preventDefault()
        //1.Get infor
        let tinhInfor={
           currentName : form.currentName.value,
           sex : form.sex.value,
           age : form.age.value,
           weight : form.weight.value,
           height : form.height.value,
           ex : form.ex.value
        }
        //2. validate Infor
        let validateResult=[
            validate(tinhInfor.currentName,'name-error',"Vui lòng nhập tên!"),
            validate(tinhInfor.sex.toUpperCase()==='NAM'|| tinhInfor.sex.toUpperCase()==='NỮ','sex-error',"Vui lòng nhập đúng giới tính nam hoặc nữ!"),
            validate(tinhInfor.age && tinhInfor.age>0 ,'age-error','Vui lòng nhập tuổi'),
            validate(tinhInfor.weight && tinhInfor.weight>0,'weight-error','Vui lòng nhập cân nặng'),
            validate(tinhInfor.height && tinhInfor.height>10,'height-error','Vui lòng nhập đúng chiều cao!'),
            validate(tinhInfor.ex && tinhInfor.ex>=0,'ex-error',"Vui lòng nhập năng lượng tập thể dục!")
        ]           
        if(allPassed(validateResult)){
            let RMR = 9.99*tinhInfor.weight + 6.25*tinhInfor.height - 4.92*tinhInfor.age+5
            let AMR = 0;
            if(tinhInfor.sex.toUpperCase()==='NAM'){
                AMR = RMR/100*30;
            } else{
                AMR = RMR/100*25;
            }
            setText('currentName',tinhInfor.currentName.toUpperCase())
            setText('RMR',RMR)
            setText('AMR',AMR)
            setText('resultEX',tinhInfor.ex)
            setText('TMR',RMR+AMR+tinhInfor.ex)
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