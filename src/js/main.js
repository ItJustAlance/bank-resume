import $ from 'jquery';
import  './libs';
import 'select2';
import 'select2/dist/css/select2.css';
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
    return false
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
    $(".js-snils_mask").mask("999-999-999 99");
  }

  if($("select.ik-select").length>0) {
    $('select.ik-select').select2({
      width: '100%'
      // placeholder: 'Select an option'
    });
    // $('select.ik-select').ikSelect();
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
  $(".js-drop-select__label").on("click", function (){
    $(this).closest(".js-drop-select").toggleClass("open");
  });
  $(".js-drop-select__val").on("click", function (){
    let val = $(this).data("label");
    $(this).closest(".js-drop-select").find(".js-drop-select__label").text(val);
    $(this).closest(".js-drop-select").removeClass("open");
  });

  $(".js-drop__label").on("click", function (){
    $(this).closest(".js-drop").toggleClass("open");
  });

  $(".js-show-more__link").on("click", function (){
    let textHide = $(this).data("hide-text");
    let textShow = $(this).data("show-text");
    $(this).text(textHide);
    $(this).toggleClass("active");
    $(this).closest(".js-show-more-wrapper").toggleClass("show");
    $(this).hasClass("active") ? $(this).text(textHide) : $(this).text(textShow)
    return false
  });
  $(".js-filter-toggler__btn, .js-filter-toggler__close").on("click", function (){
    $(".js-filter-toggler").slideToggle();
    $(".js-filter-toggler__btn").toggleClass("active")
    return false
  });


  $(document).click(function (e) {
    if (!$(".js-drop-select").is(e.target) && $(".js-drop-select").has(e.target).length === 0) {
      $(".js-drop-select").removeClass("open");
    };
  });

  $('.js-datepicker-range').daterangepicker({
    "showDropdowns": true,
    "minYear": 1900,
    "maxYear": 2025,
    "drops": "auto",
    "locale": {
      "format": "DD/MM/YYYY",
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

  });
  $('.datepicker').daterangepicker({
    "showDropdowns": true,
    "singleDatePicker": true,
    "minYear": 1900,
    "maxYear": 2025,
    "drops": "auto",
    "locale": {
      "format": "DD/MM/YYYY",
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
  $('.js-datepickermonth').daterangepicker({
    "showDropdowns": true,
    "singleDatePicker": true,
    "minYear": 1900,
    "maxYear": 2025,
    "drops": "auto",
    "locale": {
      "format": "MM/YYYY",
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


  /** плавающий блок **/
  if($(".js-floating-column").length > 0){
    var topPos = $('.js-floating-column').offset().top;
    $(window).scroll(function() {
      var top = $(document).scrollTop(),
        pip = $('.footer').offset().top,
        height = $('.js-floating-column').outerHeight();
      if (top > topPos && top < pip - height) {$('.js-floating-column').addClass('fixed').removeAttr("style");}
      else if (top > pip - height) {$('.js-floating-column').removeClass('fixed').css({'position':'absolute','bottom':'0'});}
      else {$('.js-floating-column').removeClass('fixed');}
    });
  }


  /*** tooltip ***/
  $( ".js-btn-tooltip" ).hover(
    function() {
      let text = $(this).data("tooltip");
      $( this ).append( $( "<span class='btn-tooltip-wrapper'>" + text + "</span>" ) );
    }, function() {
      $( this ).find( ".btn-tooltip-wrapper" ).remove();
    }
  );
  $(".js-open-btn-admin-panel").on("click", function (){
    $(".admin-panel").toggleClass("open")
    return false
  });


  /*** mobile menu ***/

  $(".js-btn-submenu").on("click", function (){
    $(this).toggleClass("open-submenu")
    $(this).next(".js-submenu").slideToggle()
    return false
  });





  // var data2 = {
  //   "id": 1,
  //   "text": "Tyto alba",
  //   "genus": "Tyto",
  //   "species": "alba"
  // };
  //
  // $('#sel').trigger({
  //   type: 'select2',
  //   params: {
  //     data: data2
  //   }
  // });
  // var ops = [
  //   {id: 998, text: "啥a"},
  //   {id: 996, text: "洒到"},
  //   {id: 997, text: "Asda"}
  // ];
  // var ops2 = [
  //   {id: 998, text: "啥a222"},
  //   {id: 996, text: "洒到222"},
  //   {id: 997, text: "Asda222"}
  // ];
  // $('#sel').select2({
  //   width: 280,
  //   placeholder: 'Click, Bitch',
  //   data: ops,
  // });
  // // $('#sel').trigger({
  // //   type: 'select2:select',
  // //   params: {
  // //     data: ops2
  // //   }
  // // });
  // $('#sel').on('select2:select', function (e) {
  //   console.log('select event');
  //   $('#sel2').select2({
  //     width: 280,
  //     placeholder: 'Click, Bitch',
  //     data: ops2,
  //   });
  // });
  $('.js-handler-select').on('select2:select', function (e) {
    var those = $(this);
    var func =  those.attr("handler");
    var fn = window[func];
    if (typeof fn === "function") fn.apply();
  });
});





/*** CHART ***/
// $(function () {
//
//   Chart.register(ChartDataLabels);
//
//   var ctx = document.getElementById("myChart");
//
//   function formatRate(rate) {
//     if (rate !== null && rate !== undefined) {
//       return rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     }
//     else return "0";
//   }
//
//   var data = {
//     datasets: [
//       {
//         data: [31, 5, 4, 20, 20, 25],
//         label: "Статистика",
//         labels: ['Данные 1', 'Данные 2', 'Данные 3', 'Данные 4', 'Данные 5', 'Данные 6'],
//         backgroundColor: [
//           '#ff879f',
//           '#6a1b2b',
//           '#ffafbf',
//           '#d53656',
//           '#ea9aaa',
//           '#f1bcc7'
//         ],
//         //weight:1.3,
//         datalabels: {
//           color: "white",
//           textAlign: "center",
//           font:{
//             size: 14,
//             // weight:'bold'
//           },
//           display: true, // Set to true to display the labels
//           formatter: function (value, ctx) {
//             var index = ctx.dataIndex;
//             var label = ctx.dataset.labels[index];
//             //return  `${label.replace('Q', 'Quarter')}\n${formatRate(value)}`;
//             return  `${formatRate(value)}%`;
//           }
//
//         }
//       },
//
//     ]
//   };
//
//   var options = {
//     plugins:{
//     },
//     layout: {
//     }
//   };
//
//   const plugins = [];
//
//   var pieChart = new Chart(ctx, {
//     type: "doughnut",
//     data: data,
//     plugins: plugins,
//     options: options
//   });
// });
//
// /** type: 'doughnut',
//  labels: [
//  'Red',
//  'Blue',
//  'Yellow'
//  ],
//  datasets: [{
//  label: 'My First Dataset',
//  data: [300, 50, 100],
//  backgroundColor: [
//  'rgb(255, 99, 132)',
//  'rgb(54, 162, 235)',
//  'rgb(255, 205, 86)'
//  ],
//  hoverOffset: 4
//  }]
//  });
// **/
