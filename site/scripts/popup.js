var Popup = {
    init: function(config) {
        this.config = config;

        if(jQuery(this.config.popup)) {
            this.getClose();
            this.getOpen();
        }
    },

    getOpen: function() {
        var _this = this;

        jQuery('[data-popupTarget]').on('click', function() {
            var self = jQuery(this),
                selfData = self.data();

            _this.getShow(selfData.popuptarget);
        });
    },

    getClose: function() {
        var _this = this;

        jQuery(this.config.popupClose).on('click', function() {
            _this.getHide();

            return false;
        });
    },

    getHide: function() {
        jQuery(this.config.popup).removeClass('active');
        jQuery(this.config.popupOver).removeClass('active');
    },

    getShow: function(target) {
        jQuery(this.config.popup + '.' + target).addClass('active');
        jQuery(this.config.popupOver).addClass('active');
    },

    getShowTarget: function(selector) {
        jQuery(this.config.popup + '.' + selector).addClass('active');
        jQuery(this.config.popupOver).addClass('active');
    }
};

(function($j) {

    $j(function() {

        Popup.init({
            popup: '.popup',
            popupOver: '.popup_over',
            popupClose: '.popup__close, .popup_over'
        });

    });

})(jQuery);