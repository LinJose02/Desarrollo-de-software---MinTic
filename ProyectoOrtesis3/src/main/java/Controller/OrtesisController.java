package Controller;


import Model.Ortesis;
import Service.OrtesisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/Ortesis")
public class OrtesisController {

    @Autowired
    private OrtesisService ortesisService;

    @GetMapping("/all")
    public List<Ortesis> getAll(){
        return ortesisService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Ortesis> getOrtesis(@PathVariable("id") int id){
        return ortesisService.getOrtesis(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)

    public Ortesis save (@RequestBody Ortesis ortesis){
        return ortesisService.save(ortesis);
    }
}
