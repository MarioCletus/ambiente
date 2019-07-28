package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class DiaServiceImp implements DiaService{
	@Autowired
	DiaRepository repo;
	@Override
	public Dia nuevoDia(Dia dia) {
		// TODO Auto-generated method stub
		System.out.println("Hasta aca bien " + dia.getFecha() + " " + dia.getId() + " " + dia.getPerfil_id());
		dia=repo.save(dia);
		System.out.println("Acá se pudre" + dia.getId());
		return dia;
		
	}

	@Override
	public void editarDia(Dia dia) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void borrarDia(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Optional<Dia> getDia(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Dia> getDias() {
		// TODO Auto-generated method stub
		return null;
	}

}
