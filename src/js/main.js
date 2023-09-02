import $ from 'jquery';
import  './libs';

window.addEventListener('load', () => {
  console.log($);
  // const popup = new Popup();
  // popup.open();
  $(".js-faq-toggler").on("click", function (){
    $(this).closest(".js-faq-wrapper").toggleClass("active");
    $(this).closest(".js-faq-wrapper").find(".js-faq-desq").slideToggle();
  });
  $(".js-btn-modal").on("click", function (){
    const modal = $(this).data("modal");
    $("body").addClass("lock just-modal--default")
    $("#" + modal).addClass("open ");
    setTimeout(() => ($("#" + modal).addClass("in")), 300);
  });
  $(".just-modal__overlay, .js-just-modal__close").on("click", function (){
    $("body").removeClass("lock just-modal--default")
    $(".just-modal").removeClass("open in");
  });

  $(".js-btn-password-toggle").on("click", function (){
    $(this).closest(".js-pasword-wrapper").toggleClass("show-password");
    const inpPass = $(this).closest(".js-pasword-wrapper").find(".js-pasword-input");
    const type = inpPass.attr("type");
    if( type === 'password' ){
      $(inpPass).attr("type", "text");
    }else{
      $(inpPass).attr("type", "password");
    }
  });

  $(".burger-btn").on("click", function (){
    if($(this).hasClass('opened')) {
      $(this).removeClass("opened")
      $("body").removeClass("open-menu-in")
      setTimeout(() => ($("body").removeClass("open-menu")), 300);
    } else {
      $(this).addClass("opened")
      $("body").addClass("open-menu")
      $("body").addClass("open-menu-in")
    }
  });
  if ($('.js-phone_mask').length) {
    $(".js-phone_mask").mask("+7 (999) 999-9999");
  }
  if ($('.js-snils_mask').length) {
    $(".js-snils_mask").mask("9999-99999-9999");
  }
  if($("select.ik-select").length>0) {
    $('select.ik-select').ikSelect();
  }

  $(".js-mobile-text-full").on("click", function (){
    $(this).closest(".js-text-overflow-wrapper").find(".text-full-overflow").toggle();
    $(this).closest(".js-text-overflow-wrapper").find(".text-small-overflow").toggle();

    return false
  });
});
