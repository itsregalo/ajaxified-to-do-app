
$(document).ready(function(){
    var csrfToken = $("input[name=csrfmiddlewaretoken]").val();

    $('#create-button').click(function(){
        var serializedData = $('#create-task').serialize();

        $.ajax({
            url: $('#create-task').data('url'),
            data: serializedData,
            type: 'post',
            success: function(response){
                $('#task-list').append('<div class="card mb-1 id="task-card" data-id="'
                + response.task.id +'""><div class="card-body">'
                + response.task.title +
                '<button type="button" class="close float-right" data-id="'+ response.data.id +'"><span aria-hidden="true">&times;</span></button></div></div>')
            }
        })

        $("#create-task")[0].reset();
    });

    $("#task-list").on('click','.card', function(){
        var dataId = $(this).data('id');
        $.ajax({
            url: '/home/'+ dataId + '/completed/',
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: 'post',
            success:function(){
                var cardItem = $('#task-card[data-id="'+ dataId +'"]');
                cardItem.css('text-decoration', 'line-through').hide().slideDown();
            }
        });
    }).on('click', 'button.close', function(event){
        event.stopPropagation();  //so as not to expand the event to the entire card

        var dataId = $(this).data('id');

        $.ajax({
            url: '/home/'+ dataId + '/delete/',
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: 'post',
            dataType: 'json',
            success: function(){
                $('#task-card[data-id="'+dataId+'"]').remove();
            }
        })
    });


});