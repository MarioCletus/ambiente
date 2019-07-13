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
	private PerfilServiceImp service;
	
	@CrossOrigin
	@GetMapping
	public String index() {
		System.out.print("Index");
		return "Index";
	}

	@CrossOrigin
	@GetMapping("/dia")
	public List<Perfil> getPerfil(){
		System.out.print("Get Perfil");
		return service.getPerfiles();
	}

	@CrossOrigin
	@GetMapping("/dia/{ix}")
	public Optional<Perfil> getDiaIx(@PathVariable Integer ix){
		System.out.print("Get Dia");
		return service.getPerfil(ix);
	}
	
	@CrossOrigin
	@PostMapping("/dia")
	public void DiaNuevo(@RequestBody Perfil perfil) {
		System.out.print("Post Dia");
		service.nuevoPerfil(perfil);
	}
	
	@CrossOrigin
	@PutMapping("/dia")
	public void actualizarDia(@RequestBody Perfil perfil) {
		System.out.print("Put Dia");
		service.editarPerfil(perfil);
	}

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
			System.out.print("Get perfil ix: ");
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
	
		//Servicio de registro.		
		@CrossOrigin
		@PostMapping("/password")
		public boolean isRegistered(@RequestBody Usuario usuario) {
			return usuarioService.isRegsitered(usuario);
		}
	

}