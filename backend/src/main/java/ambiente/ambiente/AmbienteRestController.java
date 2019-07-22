package ambiente.ambiente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AmbienteRestController {
	@Autowired
	private MagnitudServiceImp magnitudService;
	
	@CrossOrigin
	@GetMapping("/magnitud")
	public List<Magnitud> getMagnitudes(){
		System.out.println("Get magnitud:");
		return magnitudService.getMagnitudes();
	}

	@CrossOrigin
	@GetMapping("/magnitud/{ix}")
	public Optional<Magnitud> getMagnitudIx(@PathVariable Integer ix){
		System.out.print("Get magnitud ix: ");
		return magnitudService.getMagnitud(ix);
	}
	
	@CrossOrigin
	@PostMapping("/magnitud")
	public void MagnitudNuevo(@RequestBody Magnitud magnitud) {
		System.out.println("Post magnitud:");
		System.out.println("Id:" + magnitud.getId());
		System.out.println("Nombre:" + magnitud.getNombre());
		System.out.println("Float:" + magnitud.getListOfFloats());
		magnitudService.nuevoMagnitud(magnitud);

	}
	
	@CrossOrigin
	@PutMapping("/magnitud")
	public void actualizarMagnitud(@RequestBody Magnitud magnitud) {
		System.out.println("Put magnitud:");
		magnitudService.editarMagnitud(magnitud);
	}

	@CrossOrigin
	@DeleteMapping("/magnitud/{id}")
	public void borrarMagnitud(@PathVariable Integer id) {
		System.out.println("Delete magnitud:");
		magnitudService.borrarMagnitud(id);
	}

//Servicios para perfil
	
	@Autowired
	private PerfilServiceImp perfilService;
	
	@CrossOrigin
	@GetMapping("/perfil")
	public List<Perfil> getPerfiles(){
		System.out.println("Get perfiles:");
		return perfilService.getPerfiles();
	}

	@CrossOrigin
	@GetMapping("/perfil/{ix}")
	public Optional<Perfil> getPerfilIx(@PathVariable Integer ix){
		System.out.print("Get perfil ix: ");
		return perfilService.getPerfil(ix);
	}

	@CrossOrigin
	@PostMapping("/perfil")
	public void PefilNuevo(@RequestBody Perfil perfil) {
		System.out.println("Post perfil: " + perfil.getId() + "  " + perfil.getNombre() + "  " + perfil.getMagnitudes().size());
		perfilService.nuevoPerfil(perfil);
	}
	
	@CrossOrigin
	@PutMapping("/perfil")
	public void actualizarPerfil(@RequestBody Perfil perfil) {
		System.out.println("Put perfil:");
		perfilService.editarPerfil(perfil);
	}

	@CrossOrigin
	@DeleteMapping("/perfil/{id}")
	public void borrarPerfil(@PathVariable Integer id) {
		System.out.println("Delete perfil:");
		perfilService.borrarPerfil(id);
	}

	//Servicios para Usuario
	
		@Autowired
		private UsuarioServiceImp usuarioService;
		
		@CrossOrigin
		@GetMapping("/usuario")
		public List<Usuario> getUsuarios(){
			System.out.println("Get usuarios:");
			return usuarioService.getUsuarios();
		}

		@CrossOrigin
		@GetMapping("/usuario/{ix}")
		public Optional<Usuario> getUsuarioIx(@PathVariable Integer ix){
			System.out.print("Get usuario ix: ");
			return usuarioService.getUsuario(ix);
		}
		
		@CrossOrigin
		@PostMapping("/usuario")
		public void UsuarioNuevo(@RequestBody Usuario usuario) {
			usuarioService.nuevoUsuario(usuario);
		}
		
		@CrossOrigin
		@PutMapping("/usuario")
		public void actualizarUsuario(@RequestBody Usuario usuario) {
			System.out.println("Put usuario:");
			usuarioService.editarUsuario(usuario);
		}

		@CrossOrigin
		@DeleteMapping("/usuario/{id}")
		public void borrarUsuario(@PathVariable Integer id) {
			System.out.println("Delete usuario:");
			usuarioService.borrarUsuario(id);
		}
		
		@CrossOrigin
		@PutMapping("/usuario/magnitud")
		public void usuarioAddMagnitud(@RequestBody WrapperUsrMag wrapper) {
			Usuario usuario;
			Magnitud magnitud;
			usuario=wrapper.usuario;
			magnitud=wrapper.magnitud;
			System.out.println("Put usuarioAddMagnitud:" + usuario.getId() + " " + magnitud.getNombre());
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
			usuarioService.usuarioAddMagnitud(usuario,magnitud);
		}
	
		//Servicio de registro.		
		@CrossOrigin
		@PostMapping("/password")
		public Usuario isRegistered(@RequestBody Usuario usuario) {
			return usuarioService.isRegsitered(usuario);
		}
		//Servicios para calendario
		
		@Autowired
		private CalendarioServiceImp calendarioService;
		
		@CrossOrigin
		@GetMapping("/calendario")
		public List<Calendario> getCalendarios(){
			System.out.println("Get calendarios:");
			return calendarioService.getCalendarios();
		}

		@CrossOrigin
		@GetMapping("/calendario/{ix}")
		public Optional<Calendario> getCalendarioIx(@PathVariable Integer ix){
			System.out.print("Get calendario ix: ");
			return calendarioService.getCalendario(ix);
		}
		
		@CrossOrigin
		@PostMapping("/calendario")
		public void nuevoCalendario(@RequestBody Calendario calendario) {
			calendarioService.nuevoCalendario(calendario);
		}
		
		@CrossOrigin
		@PutMapping("/calendario")
		public void actualizarCalendario(@RequestBody Calendario calendario) {
			System.out.println("Put Calendario:");
			calendarioService.editarCalendario(calendario);
		}

		@CrossOrigin
		@DeleteMapping("/calendario/{id}")
		public void borrarCalendario(@PathVariable Integer id) {
			System.out.println("Delete Calendario:");
			calendarioService.borrarCalendario(id);
		}
	
		//Servicios para cultivo
		
		@Autowired
		private CultivoServiceImp cultivoService;
		
		@CrossOrigin
		@GetMapping("/cultivo")
		public List<Cultivo> getCultivo(){
			System.out.println("Get cultivos:");
			return cultivoService.getCultivos();
		}

		@CrossOrigin
		@GetMapping("/cultivo/{ix}")
		public Optional<Cultivo> getCultivoIx(@PathVariable Integer ix){
			System.out.print("Get cultivo ix: ");
			return cultivoService.getCultivo(ix);
		}
		
		@CrossOrigin
		@PostMapping("/cultivo")
		public void nuevoCultivo(@RequestBody Cultivo cultivo) {
			System.out.println("Post cultivo: " + cultivo.getId() + "  " + cultivo.getNombre());
			cultivoService.nuevoCultivo(cultivo);
		}
		
		@CrossOrigin
		@PutMapping("/cultivo")
		public void actualizarCultivo(@RequestBody Cultivo cultivo) {
			System.out.println("Put cultivo:");
			cultivoService.editarCultivo(cultivo);
		}

		@CrossOrigin
		@DeleteMapping("/cultivo/{id}")
		public void borrarCultivo(@PathVariable Integer id) {
			System.out.println("Delete cultivo:");
			cultivoService.borrarCultivo(id);
		}

}