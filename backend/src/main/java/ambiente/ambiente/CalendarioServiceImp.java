package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalendarioServiceImp implements CalendarioService{

	@Autowired
	private CalendarioRepository repo;

	@Override
	public Calendario nuevoCalendario(Calendario calendario) {
		return repo.save(calendario);
	}

	@Override
	public void editarCalendario(Calendario calendario) {
		repo.save(calendario);
	}

	@Override
	public void borrarCalendario(Integer id) {
		for (Calendario calendario:repo.findAll()) {
			if (calendario.getId().equals(id)) {
				repo.delete(calendario);
				return;
			}
		}
	}

	@Override
	public Optional<Calendario> getCalendario(Integer id) {
		Optional<Calendario> calendario=repo.findById(id);
		return calendario;
	}

	@Override
	public List<Calendario> getCalendarios() {
		return repo.findAll();
	}

}
