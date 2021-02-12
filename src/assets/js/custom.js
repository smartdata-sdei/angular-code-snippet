

$('#home_banner').owlCarousel({
  loop: false, 
  dots: true,
  margin: 0,
  nav: true,
  responsiveClass:true,
  responsive:{
      1100:{
        items:1         
      },
      767:{
          items:1         
      },
      600:{
          items:1
      },
      300:{
          items:1
      }
  }
});




$('#rop_rev_carousel').owlCarousel({
  loop: false, 
  dots: true,
  margin: 0,
  nav: false,
  responsiveClass:true,
  responsive:{
      1100:{
        items:1,
        dots: true,         
      },
      767:{
          items:1         
      },
      600:{
          items:1
      },
      300:{
          items:1
      }
  }
});


// ======Product Detail Quantity============

$('.add').click(function () {
  if ($(this).prev().val() < 99) {
    $(this).prev().val(+$(this).prev().val() + 1);
  }
});
$('.sub').click(function () {
  if ($(this).next().val() > 1) {
    if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
  }
});

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result)
              .width(150)
              .height(200);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

// ======Product Detail Quantity============


$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

svg4everybody();


$('#video').parent().click(function () {
  if($(this).children("#video").get(0).paused){        $(this).children("#video").get(0).play();   $(this).children("#playpause").fadeOut();
    }else{       $(this).children("#video").get(0).pause();
  $(this).children("#playpause").fadeIn();
    }
});



$("#filterToggle").click(function(){
  $("body").toggleClass("filterOpen");
});

$("#close_box").click(function(){
  $("body").removeClass("filterOpen");
});






