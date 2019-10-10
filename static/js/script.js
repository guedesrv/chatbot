(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text, side='left') {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = side === 'left' ? 'left' : 'right';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            var message = getMessageText()
            sendMessage(message, 'right');
            $.ajax({
                url: '/chatbot',
                type: 'POST',
                data: { text: message }
                //data: JSON.stringify({ text: message })
            }).done(function(msg){
                sendMessage(msg, 'left');
            }).fail(function(jqXHR, textStatus, msg){
                alert(msg);
            });
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                var message = getMessageText()
                sendMessage(message, 'right');
                $.ajax({
                    url: '/chatbot',
                    type: 'POST',
                    data: { text: message }
                    //data: JSON.stringify({ text: message })
                }).done(function(msg){
                    sendMessage(msg, 'left');
                }).fail(function(jqXHR, textStatus, msg){
                    alert(msg);
                });
            }
        });
        sendMessage('Olá eu sou o Charlie, em que posso te ajudar? :)');
    });
  }.call(this));