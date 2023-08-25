import $ from 'jquery';
import Popup from './popup';

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
  $(".just-modal__overlay, .just-modal__close").on("click", function (){
    $("body").removeClass("lock just-modal--default")
    $(".just-modal").removeClass("open in");
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


  })
});
