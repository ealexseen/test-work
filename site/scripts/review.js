(function($j) {

    $j(function() {

        /**
         * createElementValidateCustom
         */
        function createElementValidateCustom(config) {
            var lengthWord = config.e.value.split(config.reg).length,
                status = false;

            if($(config.e).next().length) {
                $(config.e).next().remove();
            }

            if(config.min) {
                if(lengthWord < config.lengthWord) {
                    var label = document.createElement('label');

                    label.id = config.e.id + '-error';
                    label.className = 'error';
                    label.setAttribute('for', config.e.id);
                    label.innerHTML = config.message;

                    config.e.parentElement.appendChild(label);
                }

                status = true;
            } else {
                if(lengthWord > config.lengthWord) {
                    var label = document.createElement('label');

                    label.id = config.e.id + '-error';
                    label.className = 'error';
                    label.setAttribute('for', config.e.id);
                    label.innerHTML = config.message;

                    config.e.parentElement.appendChild(label);
                }

                status = true;
            }

            return status;
        }

        // validate form
        if($j("#testimonial-form").length) {
            $j("#testimonial-form").validate({
                rules: {
                    content: {
                        required: function(e) {
                            var status = true;

                            status = createElementValidateCustom({
                                e: e,
                                message: 'Введите больше слов в отзыве о казино!',
                                min: true,
                                reg: ' ',
                                lengthWord: 10
                            });

                            return status;
                        }
                    },
                    plus: {
                        required: function(e) {
                            var status = true;

                            status = createElementValidateCustom({
                                e: e,
                                message: 'Введите меньше слов в достоинствах казино!',
                                min: false,
                                reg: ' ',
                                lengthWord: 20
                            });

                            return status;
                        }
                    },
                    minus: {
                        required: function(e) {
                            var status = true;

                            status = createElementValidateCustom({
                                e: e,
                                message: 'Введите меньше слов в недостатках казино!',
                                min: false,
                                reg: ' ',
                                lengthWord: 20
                            });

                            return status;
                        }
                    },
                    title: {
                        required: true
                    },
                    rat: {
                        required: true
                    }
                },
                messages: {
                    content: {
                        required: "Необходимо заполнить поле"
                    },
                    plus: {
                        required: "Необходимо заполнить поле"
                    },
                    minus: {
                        required: "Необходимо заполнить поле"
                    },
                    title: {
                        required: "Необходимо заполнить поле"
                    },
                    rat: {
                        required: "Необходимо поставить рейтинг"
                    }
                },
                submitHandler: function(form) {
                    var status = true;

                    $(form.elements).each(function(i, elem) {
                        if(!$(elem).next('label.error').length) return;
                        if($(elem).next('label.error').is(':visible')) {
                            status = false;
                        }
                    });


                    if(status) {
                        form.submit();
                    }
                }
            });
        }

    });

})(jQuery);

$(document).on('ready', function () {

    $('.c-rating__item').on('click', function () {
        var self = $(this),
            selfData = self.data('index') + 1,
            rate = $('.testimonial-block .rate');

        $("input[name='rat']")
            .val(+selfData)
            .prop('checked', true);

        rate.attr('data-current-rating', +selfData);

        rate.find('li').removeClass('is-active');

        for(var i = 0; i < +selfData; i++) {
            rate.find('li').eq(i).addClass('is-active');
        }
    });

    new Vue({
        el: '.main-part',
        data: {
            content: "",
            dost: "",
            ned: "",
            title: ""
        }
    });
});