package Service;

import Model.Ortesis;
import Repository.OrtesisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrtesisService {

    @Autowired
    private OrtesisRepository ortesisRepository;

    public List<Ortesis> getAll(){
        return (List<Ortesis>) ortesisRepository.getAll();
    }

    public Optional<Ortesis> getOrtesis(int id){
        return ortesisRepository.getOrtesis(id);
    }

    public Ortesis save(Ortesis ortesis){
        if(validarCampos(ortesis)){
            if(ortesis.getId() == null){
                return ortesisRepository.save(ortesis);
            } else{
                Optional<Ortesis> ortesisEncontrado = ortesisRepository.getOrtesis(ortesis.getId());
                if(ortesisEncontrado.isEmpty()){
                    return ortesisRepository.save(ortesis);
                } else {
                    return ortesis;
                }
            }
        }
        return ortesis;
    }
        public Ortesis update(Ortesis ortesis){
            if(validarCampos(ortesis)) {
                if (ortesis.getId() != null) {
                    Optional<Ortesis> ortesisEncontrado = ortesisRepository.getOrtesis(ortesis.getId());
                    if (!ortesisEncontrado.isEmpty()) {
                        if (ortesis.getName() != null) {
                            ortesisEncontrado.get().setName(ortesis.getName());
                        }
                        if (ortesis.getBrand() != null) {
                            ortesisEncontrado.get().setBrand(ortesis.getBrand());
                        }
                        if (ortesis.getYear() != null) {
                            ortesisEncontrado.get().setYear(ortesis.getYear());
                        }
                        if (ortesis.getDescription() != null) {
                            ortesisEncontrado.get().setDescription(ortesis.getDescription());
                        }
                        if (ortesis.getDescription() != null) {
                            ortesisEncontrado.get().setDescription(ortesis.getDescription());
                        }
                        return ortesisRepository.save(ortesisEncontrado.get());
                    }
                }
                return ortesis;
                }
            return ortesis;
            }

            public boolean deleteOrtesis(int id){
                Boolean resultado = getOrtesis(id).map(ortesisPorEliminar ->{
                    ortesisRepository.delete(ortesisPorEliminar);
                    return true;
                }) .orElse(false);
                return resultado;
            }
            public boolean validarCampos(Ortesis ortesis){
                return (ortesis.getBrand().length()<=45 && ortesis.getName().length()<=45 &&
                  String.valueOf(ortesis.getYear()).length()==4 && ortesis.getDescription().length() <= 250);
    }

}

