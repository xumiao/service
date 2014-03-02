var mobileListViewModel = kendo.observable({
    source: [],
    newItemValue: "",
    add: function (e) {
        var val = this.get("newItemValue");
        if (val) {
            this.source.push(val);
        }

        $("#listview-new-item").blur();
        e.preventDefault();
        kendoConsole.log("event :: add", e);
    },
    onClick: function (e) {
        kendoConsole.log("event :: click", e);
    }
});

function load() {
    var endpoint = 'http://fitbetter.cloudapp.net/tryme.rpy/recommend';
    $.ajax({
        url: endpoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8'
    }).done(function (res, s, x) {
        mobileListViewModel.set("source", res.results)
    });
}

$(function () {
    load();
    $('#query').on('keyup', function (e) {
        if (e.which === 13) {
            e.preventDefault();
        }
        var $query = $(e.currentTarget);
        if ($query.val().length > 3) {
            load();

        }
    });
    $(document).on('click', '.btn-like', function (el) {
        var $el = $(el.currentTarget).parent();

        var oid = $el.data('oid');

        var query = { "hard": { "Size": { "min": $el.data('size'), "max": $el.data('size') } }, "soft": ["slim fit"] };
        var data = { query: query, id: oid };
        var endpoint = 'http://fitbetter.cloudapp.net/tryme.rpy/like';
        $.ajax({
            url: endpoint,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (res, s, x) {
            mobileListViewModel.set("source", res.results)
        });
    });
    $(document).on('click', '.btn-skip', function (el) {
        var $el = $(el.currentTarget).parent();

        var oid = $el.data('oid');

        var query = { "hard": { "Size": { "min": $el.data('size'), "max": $el.data('size') } }, "soft": ["slim fit"] };
        var data = { query: query, id: oid };
        var endpoint = 'http://fitbetter.cloudapp.net/tryme.rpy/skip';
        $.ajax({
            url: endpoint,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function (res, s, x) {
            mobileListViewModel.set("source", res.results)
        });
    });
});
