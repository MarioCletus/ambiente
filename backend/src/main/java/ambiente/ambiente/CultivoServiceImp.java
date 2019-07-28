package ambiente.ambiente;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ambiente.auxiliar.WrapperDia;

@Service
public class CultivoServiceImp implements CultivoService{

	@Autowired
	private CultivoRepository repo;
	@Autowired
	private PerfilServiceImp psImp;
	@Autowired
	DiaServiceImp dsImp;


	@Override
	public Cultivo nuevoCultivo(Cultivo cultivo) {
		return repo.save(cultivo);
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
		perfiles_id=repo.getPerfilCultivo(cultivoId);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
		perfiles_id=repo.getDiasCultivo(cultivoId);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
		System.out.println("GetDiasCultivo " + perfiles_id.size()); 
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
/**
 * Añade un grupo de dias, con un perfil determinado, al cultivo.
 * Argumentos: List<Dia> dias, Perfil perfil. Ambos envueltos en wrapper.
 */
	public void agregarDias(WrapperDia wd ) {
		List<Dia> dias= new ArrayList<Dia>();
		if(wd == null) {
			System.out.println("wrapper vacio");
			return;
		}
		for(Dia dia:wd.dias) {
			System.out.println("agregarDias " + " " +
				dia.getPerfil_id() +" " +
				dia.getFecha()
			);
		}
		for(Dia dia:wd.dias) {
			System.out.println("dia: " + dia.getPerfil_id());
			dias.add(dsImp.nuevoDia(dia));
		}
		wd.cultivo.setDias(dias);
		System.out.println("Despues del for agregarDias " + wd.cultivo.dias.size());
		repo.save(wd.cultivo);
	}
}
