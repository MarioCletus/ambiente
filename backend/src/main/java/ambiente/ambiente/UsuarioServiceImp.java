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
			perfil.setMagnitudes(magnitudes);
			perfil.setNombre("Nuevo");
			psImp.nuevoPerfil(perfil);
			perfiles.add(perfil);
			Cultivo nuevoCultivo= new Cultivo();
			nuevoCultivo.setNombre("Nuevo");
			nuevoCultivo.setPerfiles(perfiles);
            csImp.nuevoCultivo(nuevoCultivo);
			List<Cultivo> cultivos = new ArrayList<Cultivo>();
			cultivos.add(nuevoCultivo);
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
	public void nuevoUsuario(Usuario usuario) {
		inicializaUsuario(usuario);
		repo.save(usuario);
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
	
	public void usuarioAddMagnitud(Usuario usuario, Magnitud magnitud) {
		System.out.println("Creando magnitud: " + magnitud.getNombre());
		msImp.nuevoMagnitud(magnitud);
		List<Magnitud> magnitudes;
		magnitudes = usuario.getMagnitudes();
		magnitudes.add(magnitud);
		usuario.setMagnitudes(magnitudes);
		editarUsuario(usuario);
	}
	

}
