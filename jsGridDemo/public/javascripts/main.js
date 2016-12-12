
var api;
var sortField = "name", sortOrder = "asc";

$("#jsGrid").jsGrid({
    width: "100%",
    height: "400px",

    inserting: false,
    editing: false,
    sorting: true,
    paging: true,
    //autoload: true,
    pageLoading: true,

    controller: {
        loadData: function (filter) {
            console.log(JSON.stringify(filter));
            sortField = filter.sortField;
            sortOrder = filter.sortOrder;

            var d = $.Deferred();

            $.ajax({
                url: "/cities",
                dataType: "json",
                data: filter
            }).done(function (response) {
                d.resolve(response);
                api.refresh();
            });

            return d.promise();
        }
    },

    fields: [
        { name: "name", type: "text", width: 200 },
        { name: "short", type: "text", width: 50 },
        { name: "region", type: "text", width: 200 },
        { type: "control" }
    ]
});

api = $("#jsGrid").data("JSGrid");
api.sort({ field: sortField, order: sortOrder });
