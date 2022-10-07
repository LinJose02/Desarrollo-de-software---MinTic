package Repository;

import Repository.CrudRepository.ClientCrudRepository;
import Repository.CrudRepository.OrtesisCrudRepository;
import Model.Client;
import Model.Ortesis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OrtesisRepository {

    @Autowired
    private OrtesisCrudRepository ortesisCrudRepository;

    public List<Ortesis> getAll(){
        return (List<Ortesis>) ortesisCrudRepository.findAll();
    }

    public Optional<Ortesis> getOrtesis (int id){
        return ortesisCrudRepository.findById(id);
    }

    public Ortesis save(Ortesis ortesis){
        return ortesisCrudRepository.save(ortesis);
    }

    public void delete(Ortesis ortesis){
        ortesisCrudRepository.delete(ortesis);
    }
}
