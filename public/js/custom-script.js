/*================================================================================
	Item Name: Materialize - Material Design Admin Template
	Version: 3.1
	Author: GeeksLabs
	Author URL: http://www.themeforest.net/user/geekslabs
================================================================================

NOTE:
------
PLACE HERE YOUR OWN JS CODES AND IF NEEDED.
WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR CUSTOM SCRIPT IT'S BETTER LIKE THIS. */

/*start=========================================================================workspaces/topology-graph.ejs*/


      // $(document).ready(function () {

        $( "#topology-toggle-btn" ).click(function() {
          $( ".topology-container" ).toggle();
        });

      // });

/*end===========================================================================workspaces/topology-graph.ejs*/





/*start=========================================================================workspaces/show.ejs*/


// $('.preloader-trigger-btn').click(function(){
//   alert($("body").attr('class'));
//   $("loader-wrapper").css("visibility", "unset");
//   $("loader-wrapper").css("transform", "translateY(+100%)");
//   $("loader-wrapper").css("transition", "all 0.3s ease-out 1s");

//   // $("body").removeclass("loaded");
// });

// $("#jupyterFormSubmitBtn").click('click', function(e) {
//   console.log("clicked");
//   $("#jupyter-form").ajaxSubmit({
//     success: function(response) {
//       $('.result').html(response);
//     }, error: function(e) {
//       $('.result').html(e);
//     }
//   });
// });
    // $("#jupyterFormSubmitBtn").click(function(e)
    // {
    //   console.log("clicked");
    //   var workspace_id = $("input#workspace_id").val();
    //   var formData = $("#ReadingInfoSelectForm").serialize();
 
    //   $.ajax({
    //         type : "POST",
    //         url : "/workspaces/"+workspace_id+"/jupyters",
    //         cache : false,
    //         data : formData,
    //         success : onSuccess,
    //         error : onError
    //   });
    //   e.preventDefault();

    // });
  // function onSuccess(json, status){alert($.trim(json));}
  // function onError(data, status){alert("error");}


/*end===========================================================================workspaces/show.ejs*/
