import $ from 'jquery';
import  './libs';
import moment from 'moment';

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
    $(".js-snils_mask").mask("999-9999-999 99");
  }
  if($("select.ik-select").length>0) {
    $('select.ik-select').ikSelect();
  }

  $(".js-mobile-text-full").on("click", function (){
    $(this).closest(".js-text-overflow-wrapper").find(".text-full-overflow").toggle();
    $(this).closest(".js-text-overflow-wrapper").find(".text-small-overflow").toggle();

    return false
  });

  $('ul.js-tab-list').delegate('li:not(.active)', 'click', function() {
    $(this).addClass('active').siblings().removeClass('active')
      .parents('.js-tabs-wrapper').find('.js-tab-box').eq($(this).index()).addClass('show').siblings('.js-tab-box').removeClass('show');
  })
  $('.datepicker-range').daterangepicker({
    "showDropdowns": true,
    "minYear": 2000,
    "maxYear": 2025,
    "drops": "auto",
    "locale": {
      "format": "MM/DD/YYYY",
      "separator": " - ",
      "applyLabel": "Сохранить",
      "cancelLabel": "Отмена",
      "fromLabel": "From",
      "toLabel": "To",
      "customRangeLabel": "Custom",
      "weekLabel": "W",
      "daysOfWeek": [
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс"
      ],
      "monthNames": [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
      ],
      "firstDay": 1
    },
    "linkedCalendars": true,
    "showCustomRangeLabel": true,
  }, function(start, end, label) {
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
  });
  $('.datepicker').daterangepicker({
    "showDropdowns": true,
    "singleDatePicker": true,
    "minYear": 2000,
    "maxYear": 2025,
    "drops": "auto",
    "locale": {
      "format": "MM/DD/YYYY",
      "separator": " - ",
      "applyLabel": "Сохранить",
      "cancelLabel": "Отмена",
      "fromLabel": "From",
      "toLabel": "To",
      "customRangeLabel": "Custom",
      "weekLabel": "W",
      "daysOfWeek": [
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
        "Вс"
      ],
      "monthNames": [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
      ],
      "firstDay": 1
    },
    "linkedCalendars": true,
    "showCustomRangeLabel": false,
  });
});
