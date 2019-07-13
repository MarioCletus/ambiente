package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiaServiceImp implements DiaService{

	@Autowired
	private PerfilRepository repo;

	@Override
	public void nuevoDia(Perfil perfil) {
		repo.save(perfil);
	}

	@Override
	public void editarDia(Perfil perfil) {
		repo.save(perfil);
	}

	@Override
	public void borrarDia(Integer id) {
		
		for (Perfil perfil:repo.findAll()) {
			if (perfil.getId().equals(id)) {
				repo.delete(perfil);
				return;
			}
		}
			
	}

	@Override
	public Optional<Perfil> getDia(Integer id) {
		Optional<Perfil> perfil=repo.findById(id);
		return perfil;
	}

	@Override
	public List<Perfil> getDias() {
		return repo.findAll();
	}


}