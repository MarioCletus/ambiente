package ambiente.ambiente;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PerfilServiceImp implements PerfilService{

	@Autowired
	private PerfilRepository repo;
	@Autowired
	MagnitudServiceImp msImp=new MagnitudServiceImp();
	
	@Override
	public Perfil nuevoPerfil(Perfil perfil) {
		return repo.save(perfil);
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

	@Override
	public List<Magnitud> getMagnitudesPerfil(Integer perfilId) {
		System.out.println("getMagnitudesPerfil" + perfilId);
		List<Integer> magnitudes_id=new ArrayList<Integer>();
		List<Magnitud> magnitudes=new ArrayList<Magnitud>();
		magnitudes_id=repo.getMagnitudesPerfil(perfilId);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
		Optional <Magnitud> optional;
		for(Integer magsIds : magnitudes_id) {
		     optional=msImp.getMagnitud(magsIds);
		     optional.ifPresent(magnitud->{
		    	 magnitudes.add(magnitud);
		     });
		}
		magnitudes.forEach((mag)->{
			System.out.println(mag.getNombre());
		});
		return magnitudes;
	}
	
	
	public Perfil addMagnitud(Perfil perfil,Magnitud magnitud) {
		magnitud.setId(null);
		perfil.addMagnitud(msImp.nuevoMagnitud(magnitud));
		return repo.save(perfil);
	 
	}


}