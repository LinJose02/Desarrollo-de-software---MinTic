package Service;

import Model.Message;
import Repository.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id){
        return messageRepository.getMessages(id);
    }


    public Message save(Message message){
        if(validarCampos(message)) {
            if (message.getIdMessage() == null) {
                return messageRepository.save(message);
            } else {
                Optional<Message> messageEncontrado = getMessage(message.getIdMessage());
                if (messageEncontrado.isEmpty()) {
                    return messageRepository.save(message);
                } else {
                    return message;
                }
            }
        }
        return message;
    }

    public Message update(Message message){
        if(validarCampos(message)) {
            if (message.getIdMessage() != null) {
                Optional<Message> messageEncontrado = getMessage(message.getIdMessage());
                if (!messageEncontrado.isEmpty()) {
                    if (message.getMessageText() != null) {
                        messageEncontrado.get().setMessageText(message.getMessageText());
                    }
                    return messageRepository.save(messageEncontrado.get());

                }
            }
            return message;
        }
        return message;
    }

    public boolean messageCategory(int messageId){
        Boolean resultado = getMessage(messageId).map(messagePorEliminar ->{
            messageRepository.delete(messagePorEliminar);
            return true;
        }) .orElse(false);

        return resultado;
    }

    public boolean validarCampos(Message message){
        return (message.getMessageText().length()<=250);
    }
}
