function onClickedAnalysis(){
    console.log("Start to Analyse Plant Leaf");
    var leafImage = document.getElementById("uiImage");
    var predictionResult = document.getElementById("prediction_result");
    var diseaseInfo = document.getElementById("disease_info");
    var diseaseTreatment = document.getElementById("disease_treatment");
    var recommendationTable = document.getElementById("dataTable");
    var messagemed = document.getElementById("message_med")
    var temp = "";
    var idx = 0;

    const endpoint = "http://127.0.0.1:5000/leaf_analysis";
    const formData = new FormData();

    formData.append('leafImage', leafImage.files[0])

    fetch(endpoint, {
        method : "post",
        body:formData
    })
    .then(response => response.json())
    .then(data =>{
        predictionResult.innerHTML = "<h2 class='text-result'>"+data.disease_result.toString()+"</h2>",
        diseaseInfo.innerHTML = "<p>"+data.disease_info.toString()+"</p>",
        diseaseTreatment.innerHTML = "<p>"+data.treatment_info+"</p>",
        data.recommendation.forEach((u)=>{
            idx++;
            temp += "<tr>";
            temp += "<td>"+idx.toString()+"</td>";
            temp += "<td>"+u.med_name+"</td>";
            temp += "<td>"+u.price+"</td>";
            temp += "<td>"+u.need+" "+u.unit+"</td>";
            temp += "<td><a href='"+u.url+"' target='_blank'>";
            temp += "</tr>";
        })
        recommendationTable.innerHTML = temp,
        messagemed.innerHTML = "<p>"+data.message+"</p>";

    });
    console.log("done process")
}

