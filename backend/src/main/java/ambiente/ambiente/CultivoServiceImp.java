package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CultivoServiceImp implements CultivoService{

	@Autowired
	private CultivoRepository repo;
	

	@Override
	public void nuevoCultivo(Cultivo cultivo) {
		repo.save(cultivo);
	}

	@Override
	public void editarCultivo(Cultivo cultivo) {
		repo.save(cultivo);
	}

	@Override
	public void borrarCultivo(Integer id) {
        Optional<Cultivo> optional;
        optional=getCultivo(id);
        optional.ifPresent(cultivo->{repo.delete(cultivo);});
	}

	@Override
	public Optional<Cultivo> getCultivo(Integer id) {
		return repo.findById(id);
	}

	@Override
	public List<Cultivo> getCultivos() {
		// TODO Auto-generated method stub
		return null;
	}



}
