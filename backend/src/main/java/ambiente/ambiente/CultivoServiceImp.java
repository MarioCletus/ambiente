package ambiente.ambiente;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CultivoServiceImp implements CultivoService{

	@Autowired
	private CultivoRepository repo;
	@Autowired
	private PerfilServiceImp psImp;
	
	

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

	@Override
	public List<Perfil> getPerfilesCultivos(Integer cultivoId) {
		
		System.out.println("getPerfilesCultivo " + cultivoId);
		List<Integer> perfiles_id=new ArrayList<Integer>();
		List<Perfil> perfiles=new ArrayList<Perfil>();
		perfiles_id=repo.getPerfilesCultivo(cultivoId);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
		Optional <Perfil> optional;
		for(Integer perfIds : perfiles_id) {
		     optional=psImp.getPerfil(perfIds);
		     optional.ifPresent(perfil->{
		    	 perfiles.add(perfil);
		     });
		}
		perfiles.forEach((perf)->{
			System.out.println(perf.getNombre());
		});
		return perfiles;
	}

	


}
