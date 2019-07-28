package ambiente.ambiente;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImp implements UsuarioService{
	
	@Autowired
	private UsuarioRepository repo;
	@Autowired
	CultivoServiceImp csImp=new CultivoServiceImp();
	@Autowired
	PerfilServiceImp psImp=new PerfilServiceImp();
	@Autowired
	MagnitudServiceImp msImp=new MagnitudServiceImp();
	@Autowired
	CalendarioServiceImp calsImp=new CalendarioServiceImp();

	/*
	 * Inicializa un usuario nuevo. Le añade un cultivo, un calendario, perfil y magnitud con
	 * nombre nuevo.
	 */
	private void inicializaUsuario(Usuario usuario){
		if(usuario.getCultivos()==null || usuario.getCultivos().size()==0) {
            Magnitud magnitud=new Magnitud();
            List <Magnitud> magnitudes=new ArrayList<Magnitud>();
            List<Float> valores=new ArrayList<Float>();
            for(int i=0;i<24;i++)
            	valores.add((float) 20.0);
            magnitud.setListOfFloats(valores);
            magnitud.setNombre("Nuevo");
            msImp.nuevoMagnitud(magnitud);
            magnitudes.add(magnitud);
			Perfil perfil=new Perfil();
			List <Perfil> perfiles= new ArrayList<Perfil>();
			perfil.setNombre("Nuevo");
			psImp.nuevoPerfil(perfil);
			perfiles.add(perfil);
			Cultivo nuevoCultivo= new Cultivo();
			nuevoCultivo.setNombre("Nuevo");
            csImp.nuevoCultivo(nuevoCultivo);
			List<Cultivo> cultivos = new ArrayList<Cultivo>();
			cultivos.add(nuevoCultivo);
			usuario.setMagnitudes(magnitudes);
			usuario.setPerfiles(perfiles);
			usuario.setCultivos(cultivos);
		}
		if(usuario.getCalendarios().size()==0) {
/*		Calendario nuevoCalendario= new Calendario();
			nuevoCalendario.setNombre("Nuevo");
			calsImp.nuevoCalendario(nuevoCalendario);
			List <Calendario> calendarios=new ArrayList<Calendario>();
			calendarios.add(nuevoCalendario);*/
//			usuario.setCalendarios(calendarios);
		}
		
	}
	
	@Override
	public Usuario nuevoUsuario(Usuario usuario) {
//		inicializaUsuario(usuario);
		return repo.save(usuario);
	}

	@Override
	public void editarUsuario(Usuario usuario) {
		System.out.println("Edicion de usuario " + usuario.getUserName());
		System.out.println("{" 
				+ usuario.getId()       + "    "
				+ usuario.getNombre()   + "    "
				+ usuario.getApellido() + "    "
				+ usuario.getUserName() + "    "
				+ usuario.getPassword() + "    "
				+ "cultivos: " + usuario.getCultivos().size() + "    "
				+ "calendarios: " + usuario.getCalendarios().size() + "    "
				+ "perfiles: " + usuario.getPerfiles().size() + "    "
				+ "magnitudes: " + usuario.getMagnitudes().size() + "    "
				+ "}"
				);
		repo.save(usuario);
		System.out.println("Fin Edicion de usuario ");
	}

	@Override
	public void borrarUsuario(Integer id) {
		Optional<Usuario> optional;
		optional=getUsuario(id);
		optional.ifPresent(usuario->{repo.delete(usuario);});
	}

	@Override
	public Optional<Usuario> getUsuario(Integer id) {
		Optional<Usuario> usuario=repo.findById(id);
		return usuario;
	}

	@Override
	public List<Usuario> getUsuarios() {
		return repo.findAll();
	}

	/****************************************************************
	 * Analiza si el usuario recibido está registrado.
	 * Parametros, usuario (incluye nombre de usuario y password.
	 * Retorna: verdadero si esta registrado y falso en caso contrario.
	 ****************************************************************/
	@Override
	public Usuario isRegsitered(Usuario usuario) {
		List<Usuario> user=repo.findByUserName(usuario.getUserName());
		if(user.size()!=1)
			return null;
		System.out.println("En BD    Usuario: " + user.get(0).getUserName() + "  Password: " + user.get(0).getPassword());
		System.out.println("Entrante Usuario: " + usuario.getUserName() + "  Password: " + usuario.getPassword());
		
		if(usuario.getPassword().equals(user.get(0).getPassword())) {
			System.out.println("Usuario y contraseña correctos");
			return user.get(0);
			}
		return null;
	}

	/****************************************************************
	 * Guarda la magnitud que viene en el argumento magnitud en el usuario usuario.
	 * Parametros, magnitud y usuario donde se guardara.
	 * Retorna: nada.
	 ****************************************************************/

	public void usuarioAddMagnitud(Usuario user, Magnitud magnitud) {
	    Usuario usuario=repo.getOne(user.getId());
		System.out.println("Creando magnitud: " + magnitud.getNombre());
		msImp.nuevoMagnitud(magnitud);
		List<Magnitud> magnitudes;
		magnitudes = usuario.getMagnitudes();
		magnitudes.add(magnitud);
		usuario.setMagnitudes(magnitudes);
		editarUsuario(usuario);
	}

	/****************************************************************
	 * Devuelve la lista de magnitudes del usuario que tiene id = id.
	 * Parametros, id de usuario.
	 * Retorna: List<Magnitud> del usuario.
	 ****************************************************************/
	@Override
	public List<Magnitud> getMagnitudUsr(Integer id) {
		System.out.println("getMagnitudesUsr " + id);
		List<Integer> magnitudes_id=new ArrayList<Integer>();
		List<Magnitud> magnitudes=new ArrayList<Magnitud>();
		magnitudes_id=repo.getMagnitudUsuario(id);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
		Optional <Magnitud> optional;
		for(Integer magIds : magnitudes_id) {
		     optional=msImp.getMagnitud(magIds);
		     optional.ifPresent(magnitud->{
		    	 magnitudes.add(magnitud);
		     });
		}
		magnitudes.forEach((mag)->{
			System.out.println(mag.getNombre());
		});
		return magnitudes;
	}

	
	/****************************************************************
	 * Guarda el perfil que viene en el argumento perfil en el usuario usuario.
	 * Parametros, perfil y usuario donde se guardara.
	 * Retorna: nada.
	 ****************************************************************/
	@Override
	public void usuarioAddPerfil(Usuario user, Perfil perfil) {
		Usuario usuario=repo.getOne(user.getId());
		System.out.println("Creando perfil: " + perfil.getNombre());
		psImp.nuevoPerfil(perfil);
		List<Perfil> perfiles;
		perfiles = usuario.getPerfiles();
		perfiles.add(perfil);
		usuario.setPerfiles(perfiles);
		editarUsuario(usuario);
	}
	
	/****************************************************************
	 * Devuelve la lista de perfil del usuario que tiene id = id.
	 * Parametros, id de usuario.
	 * Retorna: List<Perfil> del usuario.
	 ****************************************************************/
	@Override
	public List<Perfil> getPerfilesUsr(Integer id) {
		System.out.println("getPerfilesUsr " + id);
		List<Integer> perfiles_id=new ArrayList<Integer>();
		List<Perfil> perfiles=new ArrayList<Perfil>();
		perfiles_id=repo.getPerfilesUsuario(id);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
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

	/****************************************************************
	 * Guarda el cultivo que viene en el argumento cultivo en el usuario usuario.
	 * Parametros, cultivo y usuario donde se guardara.
	 * Retorna: nada.
	 ****************************************************************/
	@Override
	public void usuarioAddCalendario(Usuario user, Calendario calendario) {
		Usuario usuario=repo.getOne(user.getId());
		System.out.println("Creando perfil: " + calendario.getNombre());
		calsImp.nuevoCalendario(calendario);
		List<Calendario> calendarios;
		calendarios = usuario.getCalendarios();
		calendarios.add(calendario);
		usuario.setCalendarios(calendarios);
		editarUsuario(usuario);
	}
	
	@Override
	public List<Calendario> getCalendariosUsr(Integer id) {
		System.out.println("getCalendariosUsr " + id);
		List<Integer> calendario_id=new ArrayList<Integer>();
		List<Calendario> calendarios=new ArrayList<Calendario>();
		calendario_id=repo.getCalendariosUsuario(id);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
		Optional <Calendario> optional;
		for(Integer calIds : calendario_id) {
		     optional=calsImp.getCalendario(calIds);
		     optional.ifPresent(calendario->{
		    	 calendarios.add(calendario);
		     });
		}
		calendarios.forEach((cal)->{
			System.out.println(cal.getNombre());
		});
		return calendarios;
	}

	/****************************************************************
	 * Guarda el cultivo que viene en el argumento cultivo en el usuario usuario.
	 * Parametros, cultivo y usuario donde se guardara.
	 * Retorna: nada.
	 ****************************************************************/
	@Override
	public void usuarioAddCultivo(Usuario user, Cultivo cultivo) {
		Usuario usuario=repo.getOne(user.getId());
		System.out.println("Creando perfil: " + cultivo.getNombre());
		csImp.nuevoCultivo(cultivo);
		List<Cultivo> cultivos;
		cultivos = usuario.getCultivos();
		cultivos.add(cultivo);
		usuario.setCultivos(cultivos);
		editarUsuario(usuario);
	}
	/****************************************************************
	 * Devuelve la lista de cultivos del usuario que tiene id = id.
	 * Parametros, id de usuario.
	 * Retorna: List<Cultivo> del usuario.
	 ****************************************************************/

	@Override
	public List<Cultivo> getCultivosUsr(Integer id) {
		System.out.println("getCultivosUsr " + id);
		List<Integer> cultivos_id=new ArrayList<Integer>();
		List<Cultivo> cultivos=new ArrayList<Cultivo>();
		cultivos_id=repo.getCultivosUsuario(id);         //Trae los id de las magnitudes asociadas al usuario, desde la tabla usuario_magnitud.
		Optional <Cultivo> optional;
		for(Integer culIds : cultivos_id) {
		     optional=csImp.getCultivo(culIds);
		     optional.ifPresent(cultivo->{
		    	 cultivos.add(cultivo);
		     });
		}
		cultivos.forEach((cul)->{
			System.out.println(cul.getNombre());
		});
		return cultivos;
	}
	

}
