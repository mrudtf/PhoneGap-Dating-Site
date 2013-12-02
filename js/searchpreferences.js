var serviceURL = localStorage['serviceURL'];
var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar: false, hScroll: false });

var searchpreferences = {
    initialize: function () {
        searchpreferences.initializeSliders();
    },

    initializeSliders: function () {
        $('div[id^=slider').each(function (index, element) {
            var sliderControl = 'input.sliderValue-' + element.id.substring(element.id.indexof('-'), element.id.length + 1);
            $(element).slider({
                min: 0,
                max: 100,
                step: 1,
                range: true,
                values: [10, 90],
                slide: function (event, ui) {
                    for (var i = 0; i < ui.values.length; ++i) {
                        var control = sliderControl + '[data-index=' + i + ']';
                        $(control).val(ui.values[i]);
                    }
                }
            });

            $(sliderControl).change(function () {
                var $this = $(this);
                $(element).slider("values", $this.data("index"), $this.val());
            });
        })

        //$("#slider-age").slider({
        //    min: 0,
        //    max: 100,
        //    step: 1,
        //    range: true,
        //    values: [10, 90],
        //    slide: function(event, ui) {
        //        for (var i = 0; i < ui.values.length; ++i) {
        //            $("input.sliderValue[data-index=" + i + "]").val(ui.values[i]);
        //        }
        //    }
        //});

        //$("input.sliderValue").change(function() {
        //    var $this = $(this);
        //    $("#slider").slider("values", $this.data("index"), $this.val());
        //});
    },
};

searchpreferences.initialize();