package ambiente.ambiente;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MagnitudServiceImp implements MagnitudService{

	@Autowired
	private MagnitudRepository repo;

	@Override
	public void nuevoMagnitud(Magnitud magnitud) {
		repo.save(magnitud);
	}

	@Override
	public void editarMagnitud(Magnitud magnitud) {
		repo.save(magnitud);
	}

	@Override
	public void borrarMagnitud(Integer id) {
		
		for (Magnitud magnitud:repo.findAll()) {
			if (magnitud.getId().equals(id)) {
				repo.delete(magnitud);
				return;
			}
		}
	}

	@Override
	public Optional<Magnitud> getMagnitud(Integer id) {
		Optional<Magnitud> magnitud=repo.findById(id);
		return magnitud;
	}

	@Override
	public List<Magnitud> getMagnitudes() {
		return repo.findAll();
	}


}