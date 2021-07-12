
$(document).ready(function(){
    $('#create-button').click(function(){
        var serializedData = $('#create-task').serialize();

        $.ajax({
            url: $('#create-task').data('url'),
            data: serializedData,
            type: 'post',
            success: function(response){
                $('#task-list').append('<div class="card mb-1"><div class="card-body">'
                + response.task.title +
                '<button type="button" class="close float-right"><span aria-hidden="true">&times;</span></button></div></div>')
            }
        })

        $("create-task")[0].reset();
    });
});