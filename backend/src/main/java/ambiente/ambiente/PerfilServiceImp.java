package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PerfilServiceImp implements PerfilService{

	@Autowired
	private PerfilRepository repo;

	@Override
	public void nuevoPerfil(Perfil perfil) {
		repo.save(perfil);
	}

	@Override
	public void editarPerfil(Perfil perfil) {
		repo.save(perfil);
	}

	@Override
	public void borrarPerfil(Integer id) {
	     Optional<Perfil> optional;
	     optional=getPerfil(id);
	     optional.ifPresent(perfil->{repo.delete(perfil);});
			
	}

	@Override
	public Optional<Perfil> getPerfil(Integer id) {
		Optional<Perfil> perfil=repo.findById(id);
		return perfil;
	}

	@Override
	public List<Perfil> getPerfiles() {
		return repo.findAll();
	}


}